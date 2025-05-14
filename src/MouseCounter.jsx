import { useEffect,useState,useRef } from "react";
import DropDown from './DropDown.jsx';
import waldo from './assets/waldo.jpg';
function MouseCounter(){
  const [localMousePos, setLocalMousePos] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [marked,setMarked] = useState([]);
  const dropdownRef = useRef(null);

  const mouseClick = (event) =>{
    event.preventDefault();
    if(event.target.className === "dropItems") return;
    if(!dropdownRef.current) return;
    const boundingRect = dropdownRef.current.getBoundingClientRect();
    setLocalMousePos({ x: event.clientX - boundingRect.left  , y: event.clientY - boundingRect.top });
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return(
    <div onClick={mouseClick} ref={dropdownRef} className ="container">
      <img src = {waldo}></img>
    {marked.map((pos)=>{
      return <div className="marked" style ={{position:"absolute",top:pos.y, left:pos.x}}> </div>
    })}  
    {isOpen && (
        <div className="dropDown"  style={{position: "absolute", top:localMousePos.y, left:localMousePos.x}}>
          <DropDown boundingRect = {dropdownRef.current.getBoundingClientRect()} setMarked = {setMarked} marked = {marked} position = {localMousePos} items ={["waldo","someGuy","Some Wizard"]}></DropDown>
        </div>
    )}
    </div>
  )
}

export default MouseCounter;