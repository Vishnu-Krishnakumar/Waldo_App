import React, { useState, useRef, useEffect } from 'react';
import {confirmCoordinates} from './serverUtils/server'
function DropDown({ characters, items, position,boundingRect,setMarked, marked, found, setFound }) {

  const onClick = async(event)=>{
    event.preventDefault();

    const found = characters.find(char=>{
 
      return(
        event.target.textContent === char.name &&
        position.x >= char.x &&
        position.x <= char.x + char.width &&
        position.y >= char.y && 
        position.y <= char.y + char.height
      )
      });

      if(found){
        setMarked([...marked, {x:position.x , y:position.y }]);
        switch(found.name){
          case "Odlaw":
            setFound(prev => ({ ...prev, odlaw: true }));
            break;
          case "Waldo":
            setFound(prev => ({ ...prev, waldo: true }));
            break;
          case "Wizard":
            setFound(prev => ({ ...prev, wizard: true }));
            break;
       }
      };
      
      
  }
  
  return(
    <div>
     {items.map((item,index)=>{
      return <li className = "dropItems" onClick ={onClick} key = {index} value={item}>{item}</li>
     })}
    </div>
  )  
}

export default DropDown;