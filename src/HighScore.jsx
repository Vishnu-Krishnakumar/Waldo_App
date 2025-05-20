import { useEffect,useState } from "react";
import { highScores } from "./serverUtils/server";

 function HighScore({ref,scores}){   
    return(
        <>
        <div ref ={ref} className ="highScores">
         {scores.map((score,index)=>{
            return <li key ={index}>{index + 1}.  {score.username} {score.time}</li>
         })}
        </div>
        </>
    )
}

export default HighScore;