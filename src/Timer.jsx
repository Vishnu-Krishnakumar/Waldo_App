import { useState, useRef, useEffect } from 'react';
import { getTime } from './serverUtils/server';

function Timer() {
  const [startTime, setStartTime] = useState(null);
  const [localStartTime, setLocalStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);
  const localStartTimeRef = useRef(null);

  async function handleStart() {
    const timeNow = await getTime();
    const localTime = Date.now();
    setStartTime(timeNow);
    setLocalStartTime(localTime);
    localStartTimeRef.current = localTime; 
    setElapsed(0);

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      setElapsed(now - localStartTimeRef.current);
    }, 50);
  }

  useEffect(() => {
    handleStart();
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="timer">
      <h3>Time passed: {(elapsed / 1000).toFixed(1)}</h3>
    </div>
  );
}

export default Timer;