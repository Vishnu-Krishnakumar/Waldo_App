import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import odlaw from './assets/Odlaw.PNG';
import waldo from './assets/waldo.PNG';
import wizard from './assets/wizard.PNG';
import MouseCounter from './MouseCounter'
import Timer from './Timer';
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const [start,setStart] = useState(false);
  function click(){
    setStart(!start);
  }
  return (
    <>
      <button onClick={click}>Start</button>
      {start ?(
        <div>
          <Timer></Timer>
      <div>
       <img className = "portrait" src = {odlaw}></img>
       <img className = "portrait" src = {waldo}></img>
       <img className = "portrait" src = {wizard}></img>
      </div>
      <div>
      <MouseCounter></MouseCounter>
      </div>
        </div>
      ) : null}
      
      
      
    </>
  )
}

export default App
