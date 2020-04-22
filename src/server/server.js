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

//API ROUTES
// Respond with JS array when a GET request is made to the homepage
app.get('/', (req, res) => {
    // response.send(projectData);
    // res.sendFile(path.resolve('src/client/views/index.html'))
    res.sendFile("dist/index.html");
});

app.get('/', function (req, res) {
    res.send(mockAPIResponse)
});

// get trips
app.get('/trips', function (req, res) {
    res.send(projectData);
    // res.json(projectData);
});


// POST method route
app.post('/trips', async (req, res) => {
    console.log(req.body);
    // const city = req.body.tripData.city;
    // const startDate = req.body.tripData.start_date;
    // const endDate = req.body.tripData.end_date;
    // const dateInUnix = req.body.tripData.date;
    const { city, startDate, endDate, dateInUnix} = req.body;
    // const trip_info = {
    //     city,
    //     startDate,
    //     endDate,
    //     dateInUnix
    // };
    const coord = await fetchLatLong(process.env.GEONAMES_USERNAME, city);
    // fetchLatLong(city).then(coordinates => {
    //     trip_info["latitude"] = coordinates.latitude;
    //     trip_info["longitude"] = coordinates.longitude;
    const image = await getPixabayImages(process.env.PIXABAY_API_KEY, city);
    let weatherInfo = {};
    if(coord){
        getWeatherData = await getWeather(process.env.WEATHER_BIT_API_KEY, coord.lat ,coord.lng, datetime);
    }
    createTrip = [
        {
            city:city,
            start_date:startDate,
            end_date:endDate,
            image:cityImageUrl,
            temp:temp,
            weather:weather,
            timeZone:timeZone
        },
        ...createTrip];
        res.send({success:true});
});
        // getWeather(
        //     coordinates.latitude,
        //     coordinates.longitude,
        //     dateInUnix
        // ).then(forecast => {
        //     trip_info["weather"] = forecast.weather;
        //     trip_info["temp"] = forecast.temp;
        //     trip_info["timeZone"] = forecast.timeZone;
    
            // getPixabayImages(city).then(imageInfo => {
            //     trip_info["cityImageUrl"] = imageInfo.imageUrl;

            //     projectData.push(trip_info);
            //     res.json(trip_info);
//             });
//         });
//     });
// });

// app.post('/fetchWeather', (req, res) => {
//     const queryUrl = req.body.queryUrl;
//     request({
//         url: queryUrl
//     }, (error, response, body) => {
//         if (error || response.statusCode !== 200) {
//             return res.status(500).json({
//                 type: "error",
//                 message: err.message
//             });
//         }

//         res.json(JSON.parse(body));
//     });
// });

//Fetch latitude/longitude From GEONAMES API
const fetchLatLong = async (cityName , username) => {
    const queryUrl = `http://api.geonames.org/searchJSON?q=${cityName}&maxRows=1&username=${GEONAMES_USERNAME}`;
    const request = await fetch(queryUrl);
    try {
        const data = await request.json();
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
const getWeather = async (lat, lon, datetime, key) => {
    const queryUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${key}&lat=${data.lat}&lot=${data.lon}&datetime=${data.datetime}`;
    const request = await fetch(queryUrl);
    try {
        const data = await request.json();
        console.log(data);
        const forecast = {
            weather: data.data[0].weather.description,
            temp: data.data[0].temp,
            timeZone: data.data[0].timezone
        }
        return forecast;
    } catch (error) {
        console.log(error);
    }
};
//Fech Images from Pixabay Api
const getPixabayImages = async (key, image) => {
    const queryUrl = `https://pixabay.com/api/?key=${key}&q=${image}`;
    const request = await fetch(queryUrl);
    try {
        const data = await request.json();
        const imageInfo = {
            imageURL: data.hits[0].largeImageURL
        }
        return imageInfo;
    } catch (error) {
        console.log(error);
    }
};

