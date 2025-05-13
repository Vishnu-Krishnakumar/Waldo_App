import React, { useState, useRef, useEffect } from 'react';
function DropDown({ items, position }) {

  const onClick = (event)=>{
    event.preventDefault();
    console.log(position);
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