import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import odlaw from './assets/Odlaw.PNG';
import waldo from './assets/waldo.PNG';
import wizard from './assets/wizard.PNG';
import Game from './Game'
import Timer from './Timer';
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const [start,setStart] = useState(false);
  const [begin,setBegin] = useState(false);
  const [found, setFound] = useState({odlaw:false,waldo:false,wizard:false});
  function click(){
    setStart(!start);
    setBegin(false);
  }
  
  return (
    <>
      <button onClick={click}>Start</button>
      {start ?(
        <div>
          <Timer found = {found} setFound ={setFound} setBegin ={setBegin}></Timer>
      <div>
       <img className={found.odlaw ? "found" : "portrait"} src = {odlaw}></img>
       <img className={found.waldo ? "found" : "portrait"} src = {waldo}></img>
       <img className={found.wizard ? "found" : "portrait"} src = {wizard}></img>
      </div>
      {begin?(
        <div>
        <Game found = {found} setFound = {setFound}></Game>
        </div>  
      ): null}
      
        </div>
      ) : null}
      
      
      
    </>
  )
}

export default App
