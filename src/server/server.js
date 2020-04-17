// Setup empty JS array to act as endpoint for all routes
projectData = {};

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY

// Require Express to run server and routes
const express = require('express');
/* Dependencies */
const bodyParser = require('body-parser');
// Cors for cross origin allowance
const cors = require('cors');
const path = require('path');

// Start up an instance of app
const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();

// Initialize the main project folder
app.use(express.static('dist'));
console.log(__dirname);
// Setup Server
// Spin up the server
app.listen(2002, () => console.log('running on localhost:  2002'));

// Respond with JS object when a GET request is made to the homepage
app.get('/', (request, response) => {
    // response.send(projectData);
    res.sendFile(path.resolve('src/client/views/index.html'))
});

app.get('/', function (req, res) {
    res.send(mockAPIResponse)
})
app.get('/all', function (req, res) {
    res.send(projectData);
});

// POST method route

app.post('/weather', addInfo);

function addInfo(req, res) {
    const url = ``;
    const city = `${req.body.cityName}`;
    const dates = `${req.body.departure}`;
    newEntry = {
        weather: req.body.weather,
        date: req.body.date,
        cityName: req.body.cityName,
    };
    projectData.push(newEntry);
    res.send(projectData);
};

app.post('/image', (req, res) => {
    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${req.body.cityName}&image_type=photo`;
})