
async function confirmCoordinates(){
  try{
    const response = await fetch(`https://waldoapi-r65s.onrender.com/locate`,{
        mode:"cors",
        method:"GET",
        credentials:"include",
        headers:{
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    console.log(data);
    return data;
  }catch(error){console.log(error)};

}

async function getTime(){
  try{
    const response = await fetch(`https://waldoapi-r65s.onrender.com/timer`,{
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

async function postScore(data){
  const body ={ username:data.username, time:data.time };
  console.log(body);
  try{
    const response = await fetch(`https://waldoapi-r65s.onrender.com/score`,{
      mode: "cors",
      method:"POST",
      credentials: "include",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data);
    return data;
  }catch(error){console.log(error)}
}

async function highScores(){
  try{
    const response = await fetch("https://waldoapi-r65s.onrender.com/score",{
      mode:"cors",
      method:"GET",
      credentials:"include",
      headers:{
        "Content-Type":"application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  }catch(error){console.log(error)}
}
export {
  confirmCoordinates,
  getTime,
  postScore,
  highScores,
}