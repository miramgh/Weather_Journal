// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express    = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// Start up an instance of app
const app        = express();
app.use(cors());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));

// SETTING OUR RESTFUL ROUTES

// Setting the post route
app.post('/data',postData);

function postData (req, res){
  
  newEntry={
    date    : req.body.date,
    temp    :req.body.temp,
    content : req.body.feelings
  }
    
    projectData.push(newEntry);
    res.status(200).json({
      status:'success',
      projectData
    })
}
// Setting the get route
app.get('/all',getData);
function getData (req, res){
    res.send(projectData)
}


// Setup Server
const port = 4000;
app.listen(port, () =>{
  console.log(`running on localhost: ${port}`);
});