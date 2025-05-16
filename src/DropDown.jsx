import React, { useState, useRef, useEffect } from 'react';
import {confirmCoordinates} from './serverUtils/server'
function DropDown({ items, position,boundingRect,setMarked, marked }) {

  const onClick = async(event)=>{
    event.preventDefault();
    console.log(position);
    if( await confirmCoordinates(position) === true ){
      setMarked([...marked, {x:position.x , y:position.y }]);
    }
  }
  
  return(
    <div>
     {items.map((item,index)=>{
      return <li className = "dropItems" onClick ={onClick} key = {index}>{item}</li>
     })}
    </div>
  )  
}

export default DropDown;