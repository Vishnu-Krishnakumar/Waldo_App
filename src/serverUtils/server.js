
async function confirmCoordinates(coords){
  try{
    const response = await fetch(`http://localhost:3000/locate?character=Waldo&x=${coords.x}&y=${coords.y}`,{
        mode:"cors",
        method:"GET",
        credentials:"include",
        headers:{
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    console.log(data);
    return data.found;
  }catch(error){console.log(error)};

}

async function getTime(){
  try{
    const response = await fetch(`http://localhost:3000/timer`,{
      mode:"cors",
      method:"GET",
      credentials:"include",
      headers:{
        "Content-Type":"application/json",
      },
    });
    let data = await response.json();

    data = data.token.split('.');
  

    data = parseInt(JSON.parse(atob(data[1])).start);

    return (data);
  }catch(error){console.log(error)}
}

export {
  confirmCoordinates,
  getTime,
}