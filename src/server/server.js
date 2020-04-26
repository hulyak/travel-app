//initializing the express server
const express = require('express');
const app = express();
const postData1 = [];
//add middleware to the server

const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());

//add cors 

const cors = require('cors');
app.use(cors());


app.use(express.static('dist'))

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'));
});
app.get('/getWeather', function (req, res) {
    res.send(postData1);
});
/*create routes for post request of weather data*/
app.post('/weatherdata', function (req, res) {

    console.log(req.body);
    newEntry = {
        weather: req.body.weather,
        date: req.body.dateT,
        cityname: req.body.cityname,
    };
    postData1.push(newEntry);
    res.send(postData1);
});


////   start server
const port = 3000;
const server = app.listen(port, () => {
    console.log(`running on localhost :${port} `);
});
const checkIfPort = num => {
    return num === port;
};

module.exports = {
    checkIfPort
};