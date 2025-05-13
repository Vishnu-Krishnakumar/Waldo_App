import { useEffect,useState,useRef } from "react";
import DropDown from './DropDown.jsx'
function MouseCounter(){
  const [localMousePos, setLocalMousePos] = useState({});
  const [isOpen, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const mouseClick = (event) =>{
    event.preventDefault();
    if(event.target.className === "dropItems") return;
    if(!dropdownRef.current) return;
    const boundingRect = dropdownRef.current.getBoundingClientRect();
    setLocalMousePos({ x: event.clientX - boundingRect.left  , y: event.clientY - boundingRect.top });
    setOpen(true);
    console.log(event.target);
  }
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return(
    <div onClick={mouseClick} ref={dropdownRef} style={{ position: "relative" } } className ="test">
  
    {isOpen && (
        <div className="dropDown"  style={{position: "absolute", top:localMousePos.y, left:localMousePos.x}}>
          <DropDown position = {localMousePos} items ={["waldo","someGuy","Some Wizard"]}></DropDown>
        </div>
    )}
    </div>
  )
}

export default MouseCounter;