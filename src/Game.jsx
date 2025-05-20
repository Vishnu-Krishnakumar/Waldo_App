import { useEffect,useState,useRef } from "react";
import DropDown from './DropDown.jsx';
import waldo from './assets/waldo.jpg';
import {confirmCoordinates} from './serverUtils/server'
function Game({found,setFound,setMessage}){
  const [localMousePos, setLocalMousePos] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [marked,setMarked] = useState([]);
  const [characters,setCharacters] = useState({});
  
  const dropdownRef = useRef(null);

  const mouseClick = (event) =>{
    event.preventDefault();
    if(event.target.className === "dropItems") return;
    if(!dropdownRef.current) return;
    const boundingRect = dropdownRef.current.getBoundingClientRect();
    setLocalMousePos({ x: event.clientX - boundingRect.left  , y: event.clientY - boundingRect.top });
    setOpen(true);
  }
  useEffect(()=>{
    async function getCharacterCoords(){
      const data = await confirmCoordinates();
      setCharacters(data);
    }

    getCharacterCoords();
  },[])

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
      return <div className="marked" style ={{position:"absolute",top:pos.y - 15, left:pos.x - 15}}> </div>
    })}  
    {isOpen && (
          <div className="dropDown"  style={{position: "absolute", top:localMousePos.y, left:localMousePos.x+25}}>
            <DropDown 
              setMessage ={setMessage}
              characters ={characters} 
              boundingRect = {dropdownRef.current.getBoundingClientRect()}
              setMarked = {setMarked} 
              marked = {marked} 
              position = {localMousePos}
              items ={["Waldo","Odlaw","Wizard"]} 
              found = {found} 
              setFound ={setFound}
            />  
          </div>
    )}
    {isOpen &&(
      <div className = "target" style = {{position:"absolute", top:localMousePos.y-25 , left:localMousePos.x -15 }}>
      </div>  
    )}
    </div>
  )
}

export default Game;