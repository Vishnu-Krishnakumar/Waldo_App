import React, { useState, useRef, useEffect } from 'react';
function DropDown({ items }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dropdownRef = useRef(null);
  return(
    <>
     {items.map((item,index)=>{
      return <li key = {index}>{item}</li>
     })}
    </>
  )  
}

export default DropDown;