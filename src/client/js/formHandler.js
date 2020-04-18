const submit = document.querySelector('#button');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//example request
//https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=API_KEY
function handleSubmit(place, date) {
    const baseUrl = 'http://api.geonames.org/geoCodeAddressJSON?q=';
    const username = 'hulya';
    fetchLatLong(place, baseUrl, username)
        .then(data => {
            const baseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
            const weatherAPI = '04fa6da2d39e4f31b3d25b6d75ad1c84';

            getForecastWeather(baseUrl, weatherAPI, data, date).then(weatherData => {
                postData('http://localhost:2000/weatherdata', {
                        weather: weatherData,
                        date: date,
                        cityname: city
                    })
                    .then(function (server) {
                        getDataFromServer('http://localhost://2000/getWeather').then(function (getData) {
                            updateUI(getData);
                        });
                    });
            });
        });
};

//Fetch latitude/longitude From GEONAMES API 
const fetchLatLong = async (place, baseUrl, username) => {
    let coord = {
        longitude: '',
        latitude: '',
    };
    const response = await fetch(`${baseUrl}${place}&username=${username}`);
    try {
        const data = await response.json();
        coord['lng'] = data['address']['lng'];
        coord['lat'] = data['address']['lat'];
        return coord;
    } catch (error) {
        document.getElementById('city').style.cssText = "border: 1px solid red";
        document.getElementById('nameerror').innerHTML = 'City is not found';
    }
}

//Post request to server
const postData = async (baseUrl = '', data = {}) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

//FETCH data from weather api 
const getWeather = async (baseUrl, apiKey, data, date) => {
    const response = await fetch(`${baseUrl}lat=${data['lat']}$lon=${data['lng']}&key=${apiKey}`);
    try {
        const dataWeather = await response.json();
        console.log(dataWeather);
        return dataWeather;
    } catch (error) {
        console.log(error);
    }
}

//Get Data Saved on the server
const getDataFromServer = async (url) => {
    const weatherD = await fetch(url);
    try {
        const getW = weatherD.json();
        return getW;
    } catch (error) {
        console.log(error);
    }
}

//Update UI
const updateUI = async (input) => {
    const pixabayUrl = "https://pixabay.com/api/?key=";
    const key = '16060501-e2d3132e99ce2be48e2344f5f';
    getPixabayImages(pixabayUrl, key, input);
}

//Get 
const getPixabayImages = async (pixabayUrl, key, input) => {
    const length = input['length'] - 1;
    console.log(input['length']);
    const response = await fetch(`${url}${key}&q=${getData[length]['cityname']}+city&image_type=photo`);
    try {
        const image = await response.json();
        Client.changeUI(input, image);
    } catch (error) {
        console.log(error);
    }
}
export {
    handleSubmit
}