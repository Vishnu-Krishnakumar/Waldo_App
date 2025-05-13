
async function confirmCoordinates(coords){
  try{
    const response = await fetch('',{
        mode:"cors",
        method:"GET",
        credentials:"include",
        headers:{
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
  }catch(error){console.log(error)};
}