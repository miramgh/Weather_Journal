/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const APIkey = '&appid=cd9bd3a48f49dc38bf229b3fabfe84a3';




// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click',performAction);

function performAction(e){
    const ZIPcode = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;

    getWeather(baseURL,ZIPcode,APIkey)
    .then(function(data){
        postData('http://localhost:4000/data',{date : newDate , temp : data.main.temp ,content : userResponse})
        .then(function(){
            UpdateUI();
        })
    }) 
}

async function getWeather(baseURL,ZIPcode,APIkey){
    const response = await fetch(baseURL+ZIPcode+',us'+APIkey);
    try{
        const newData = await response.json();
        return newData;
    }
    catch(error){
        console.log('error :' + error);
    }
}

async function postData( url = '', data = {}){
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },     
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
      console.log("error", error);
    }
}

async function UpdateUI(){

    const response =await fetch('http://localhost:4000/all');
    try{
        const Data = await response.json();
        document.getElementById('date').innerHTML = Data.date;
        document.getElementById('temp').innerHTML = Data.temp;
        document.getElementById('content').innerHTML = Data.content;
    }catch(error){
        console.log('error :' + error);
    }
}


