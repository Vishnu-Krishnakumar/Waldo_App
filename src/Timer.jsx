import { useState, useRef, useEffect } from 'react';
import {getTime} from './serverUtils/server';
function Timer() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  async function handleStart() {
    const timeNow = await getTime();

    setStartTime(timeNow);
    setNow(timeNow);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
    setNow(Date.now());
    }, 5);
  }

  useEffect( ()=>{
    handleStart();
  },[])

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

 

  return (
    <div className = "timer">
      <h3>Time passed: {secondsPassed.toFixed(3)}</h3>
    </div>
);
}
  
export default Timer;