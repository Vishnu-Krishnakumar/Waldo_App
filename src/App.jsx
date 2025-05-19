import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import odlaw from './assets/Odlaw.PNG';
import waldo from './assets/waldo.PNG';
import wizard from './assets/wizard.PNG';
import Game from './Game'
import Timer from './Timer';
import './App.css'
import { postScore,highScores } from './serverUtils/server';

function App() {
  const [count, setCount] = useState(0)
  const [start,setStart] = useState(false);
  const [begin,setBegin] = useState(false);
  const [found, setFound] = useState({odlaw:false,waldo:false,wizard:false});
  const [time, setTime] = useState(0)
  function click(){
    setStart(!start);
    setBegin(false);
  }
  async function post(formData){
    console.log(formData);
    await postScore({username:formData.get("username"), time:time});
    await highScores();
  }

  return (
    <>
      <button onClick={click}>Start</button>
      {start ?(
        <div>
          <Timer setTime ={setTime}found = {found} setFound ={setFound} setBegin ={setBegin}></Timer>
        <div>
         <img className={found.odlaw ? "found" : "portrait"} src = {odlaw}></img>
         <img className={found.waldo ? "found" : "portrait"} src = {waldo}></img>
         <img className={found.wizard ? "found" : "portrait"} src = {wizard}></img>
        </div>
        { found.odlaw && found.waldo && found.wizard?(
            <form action ={post}>
              <label>User Name:</label>
              <input name = "username"/>
              <button type ="submit">Submit</button>
            </form>
        ):null}
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
