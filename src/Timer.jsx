import { useState, useRef, useEffect } from 'react';
import { getTime, postScore } from './serverUtils/server';

function Timer({setBegin,found,setfound,setTime}) {
  const [startTime, setStartTime] = useState(null);
  const [localStartTime, setLocalStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  async function handleStart() {
    try{
      const timeNow = await getTime();
      const localTime = Date.now();
      setBegin(true); // when the timer starts the picture will populate by changing this state
      setStartTime(timeNow);
      setLocalStartTime(localTime);
      setElapsed(0);
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
      const now = Date.now();
      setElapsed(now - localTime);
    }, 50);
    }catch(error){console.log(error)}
    
  }

  useEffect(() => {
    handleStart();
    return () => clearInterval(intervalRef.current);
  }, []);
  
  useEffect(()=>{
    async function post(time){
      const data = await postScore(time);

    }
    if(found.odlaw && found.waldo && found.wizard){

      clearInterval(intervalRef.current);

      setTime((elapsed/1000).toFixed(2));
    
    }
  },[found]);
  return (
    <div className="timer">
      <h3>Time passed: {(elapsed / 1000).toFixed(2)}</h3>
    </div>
  );
}

export default Timer;