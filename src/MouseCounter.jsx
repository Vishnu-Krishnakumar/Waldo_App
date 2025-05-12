import { useEffect,useState,useRef } from "react";
import DropDown from './DropDown.jsx'
function MouseCounter(){
  const [localMousePos, setLocalMousePos] = useState({});
  const [isOpen, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const mouseClick = (event) =>{
    event.preventDefault();
    setLocalMousePos({ x: event.clientX , y: event.clientY  });
    setOpen(true);
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

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return(
    <div onClick={mouseClick} className ="test">
  
    {isOpen && (
        <div className="dropDown" ref={dropdownRef} style={{top:localMousePos.y, left:localMousePos.x}}>
          <DropDown items ={["waldo","someGuy","Some Wizard"]}></DropDown>
        </div>
    )}
    </div>
  )
}

export default MouseCounter;