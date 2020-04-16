// Setup empty JS array to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
// Initialize the main project folder
app.use(express.static('dist'));

console.log(__dirname)
// Setup Server
// Spin up the server
app.listen(2002, () => console.log('running on localhost:  2002'));

// Respond with JS object when a GET request is made to the homepage
//Create endpoints / route handlers
app.get('/', (request, response) => {
    // response.send(projectData);
    res.sendFile(path.resolve('src/client/views/index.html'))
});

// POST method route

app.post('/weather', addInfo);

function addInfo(req, res) {
    newEntry = {
        weather: req.body.weather,
        date: req.body.date,
        cityName: req.body.cityName,
    };
    projectData.push(newEntry);
    res.send(projectData);
};

app.get('/', function (req, res) {
    res.send(mockAPIResponse)
})
app.get('/getWeather', function (req, res) {
    res.send(projectData);
});