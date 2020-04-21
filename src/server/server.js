// Setup empty JS array to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
const request = require('request');
const fetch = require("node-fetch");
const mockAPIResponse = require('./mockAPI.js');
const dotenv = require('dotenv');
dotenv.config();
// Cors for cross origin allowance
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');


// Start up an instance of app
const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());


// Initialize the main project folder
app.use(express.static('dist'));
console.log(__dirname);

// Spin up the server
app.listen(2002, () => console.log('running on localhost:  2002'));

///APIS 
//example requests
//http://api.geonames.org/searchJSON?q=Seattle&username=hulya
const GEONAMES_BASE_URL = "http://api.geonames.org/searchJSON?q=";
const GEONAMES_USERNAME = "hulya";
const GEONAMES_URL = '&maxRows=10&username=';

//https://api.weatherbit.io/v2.0/current?&lat=38.123&lon=-78.543&key=04fa6da2d39e4f31b3d25b6d75ad1c84
const WEATHERBIT_BASE_URL = "https://api.weatherbit.io/v2.0/forecast/daily?";
const WEATHERBIT_API_KEY = "04fa6da2d39e4f31b3d25b6d75ad1c84";

//https: //pixabay.com/api/?Paris&key=16060501-e2d3132e99ce2be48e2344f5f&image_type=photo&pretty=true&category=places
const PIXABAY_BASE_URL = "https://pixabay.com/api/?key=";
const PIXABAY_API_KEY = "16060501-e2d3132e99ce2be48e2344f5f";
const PIXABAY_URL = '&image_type=photo&pretty=true&category=places';

//Fetch latitude/longitude From GEONAMES API
const fetchLatLong = async (cityName = '') => {
    const queryUrl = `${GEONAMES_BASE_URL}${cityName}${GEONAMES_URL}${GEONAMES_USERNAME}`;
    const request = await fetch(queryUrl);
    try {
        const data = await response.json();
        const coordinates = {
            longitude: data.geonames[0].lng,
            latitude: data.geonmaes[0].lat
        };
        return coordinates;
    } catch (error) {
        console.log("error", error)
    }
};
//FETCH data from weather api
const getWeather = async (lat = '', lon = '', date = '') => {
    const queryUrl = `${WEATHERBIT_BASE_URL}${WEATHERBIT_API_KEY}&lat=${data.lat}&lot=${data.lon}&datetime=${data.date}`;
    const request = await fetch(queryUrl);
    try {
        const data = await request.json();
        console.log(data);
        const forecast = {
            weather: data.data[0].weather.description,
            temp: data.data[0].temp,
            timeZone: data.data[0].timezone
        }
        return data;
    } catch (error) {
        console.log(error);
    }
};
//Fech Images from Pixabay Api
const getPixabayImages = async (cityName = '') => {
    const queryUrl = `${PIXABAY_BASE_URL}${PIXABAY_API_KEY}${PIXABAY_URL}${cityName}`;
    const request = await fetch(queryUrl);
    try {
        const data = await response.json();
        const imageInfo = {
            imageURL: data.hits[0].webformatURL,
            width: data.hits[0].webformatWidth,
            height: data.hits[0].webformatHeight
        }
        return imageInfo;
    } catch (error) {
        console.log(error);
    }
};

//API ROUTES
// Respond with JS array when a GET request is made to the homepage
app.get('/', (req, res) => {
    // response.send(projectData);
    // res.sendFile(path.resolve('src/client/views/index.html'))
    res.sendFile("index.html");
});

app.get('/', function (req, res) {
    res.send(mockAPIResponse)
});

// get trips
app.get('/trips', function (req, res) {
    // res.send(projectData);
    res.json(projectData);
});


// POST method route
app.post('/fetchInfo', (req, res) => {
    console.log(req.body);
    const city = req.body.tripData.city;
    const startDate = req.body.tripData.start_date;
    const endDate = req.body.tripData.end_date;
    const dateInUnix = req.body.tripData.date;

    const trip_info = {
        city,
        startDate,
        endDate,
        dateInUnix
    };
    fetchLatLong(city).then(coordinates => {
        trip_info["latitude"] = coordinates.latitude;
        trip_info["longitude"] = coordinates.longitude;

        getWeather(
            coordinates.latitude,
            coordinates.longitude,
            dateInUnix
        ).then(forecast => {
            trip_info["weather"] = forecast.weather;
            trip_info["temp"] = forecast.temp;
            trip_info["timeZone"] = forecast.timeZone;

            getPixabayImages(city).then(imageInfo => {
                trip_info["cityImageUrl"] = imageInfo.imageUrl;

                projectData.push(trip_info);
                res.json(trip_info);
            });
        });
    });
});

app.post('/fetchWeather', (req, res) => {
    const queryUrl = req.body.queryUrl;
    request({
        url: queryUrl
    }, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            return res.status(500).json({
                type: "error",
                message: err.message
            });
        }

        res.json(JSON.parse(body));
    });
});