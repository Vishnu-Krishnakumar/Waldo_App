import { useEffect,useRef, useState } from 'react'

import odlaw from './assets/Odlaw.PNG';
import waldo from './assets/waldo.PNG';
import wizard from './assets/wizard.PNG';
import Game from './Game'
import Timer from './Timer';
import HighScore from './HighScore';
import './App.css'
import { postScore,highScores } from './serverUtils/server';

function App() {
  const [count, setCount] = useState(0)
  const [start,setStart] = useState(false);
  const [begin,setBegin] = useState(false);
  const [found, setFound] = useState({odlaw:false,waldo:false,wizard:false});
  const [time, setTime] = useState(0)
  const [scores,setScores] = useState([]);
  const [message,setMessage] = useState("");
  const compRef = useRef([]);

  function click(){
    setStart(!start);
    setBegin(false);
    setFound({odlaw:false,waldo:false,wizard:false});
  }

  async function post(formData){

    await postScore({username:formData.get("username"), time:time});
    setStart(!start);
  }
  useEffect(()=>{
    async function high(){
        const data =  await highScores();

        setScores(data);
    }
  high();
},[])
  return (
    <div className = "content">
      <h1> Where's Waldo!</h1>
      
      {!start && scores.length > 0?(
        <HighScore scores ={scores} ref = {compRef}/>
      ):null} 
      <button onClick={click}>{!start?"Start":"Restart"}</button>
      {start ?(
        <div>
          <Timer setTime ={setTime}found = {found} setFound ={setFound} setBegin ={setBegin}></Timer>
        <div>
         <img className={found.odlaw ? "found" : "portrait"} src = {odlaw}></img>
         <img className={found.waldo ? "found" : "portrait"} src = {waldo}></img>
         <img className={found.wizard ? "found" : "portrait"} src = {wizard}></img>
        </div>
        <div>
          {message}
        </div>
        { found.odlaw && found.waldo && found.wizard?(
            <div>
            <form action ={post}>
              <label>User Name:</label>
              <input name = "username"/>
              <button type ="submit">Submit</button>
            </form>
            </div>
        ):null}
        {begin?(
          <div>
            <Game setMessage ={setMessage} found = {found} setFound = {setFound}></Game>
          </div>  
        ): null}
      
        </div>
        ) : null}
      
      
      
    </div>
  )
}

export default App
