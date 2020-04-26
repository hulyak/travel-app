const {
    calculateTime
} = require("./calculateTime");

export function onCreate() {
    event.preventDefault();
    const place = document.getElementById('city').value.trim();
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const dateInUnix = new Date(startDate).getTime() / 1000;
    const diff = calculateTime(startDate, endDate);
    console.log(diff);
    if (place == '') {
        alert("Please enter a place name");
    }
    if (startDate.length === 0 || endDate.length === 0) {
        alert("Please enter a date");
    }
    if (diff === "error") {
        alert('Travel Date cannot be before current time');
    } else {
        callGeoNameApi(place);
    }
}

function isDateValid(date1) {
    let d = new Date();
    let date = new Date(date1);
    if (date < d) {
        return false;
    }
    return true;
}

export function callGeoNameApi(place) {
    const baseUrl = "http://api.geonames.org/geoCodeAddressJSON?q=";
    const username = "hulya";
    fetchLatLang(place, baseUrl, username).then(function (data) {
        const baseUrl = "https://api.weatherbit.io/v2.0/forecast/daily?";
        const keyweatherapi = '04fa6da2d39e4f31b3d25b6d75ad1c84';
        const startDate = document.querySelector('#start-date');
        const endDate = document.querySelector("#end-date");
        const dateInUnix = new Date(startDate).getTime() / 1000;
        const diff = calculateTime(start_date, end_date);
        getWeatherData(baseUrl, keyweatherapi, data, startDate).then(function (wdata) {
            postDataToServer('http://localhost:3000/weatherdata', {
                weather: wdata,
                startDate: startDate,
                endDate: endDate,
                diff,
                cityname: place
            }).then(
                function (serverData) {
                    getDataFromServer('http://localhost:3000/getWeather').then(function (getData) {
                        updateUI(getData);
                    });
                }
            );
        });
    });
}
export const fetchLatLang = async (place, baseUrl, username) => {
    let coord = {
        lang: '',
        lat: '',
    };
    const response = await fetch(`${baseUrl}${place}&username=${username}`);
    try {
        const data = await response.json();
        coord['lng'] = data['address']['lng'];
        coord['lat'] = data['address']['lat'];
        return coord;
    } catch (error) {
        document.getElementById('city').style.cssText = "border:1px solid red";
        alert("Sorry, try again!");
    }
}

/* Post data to the server */
export const postDataToServer = async (baseUrl = '', data = {}) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error:" + error);
    }
}

// const deleteTrip = async (baseUrl = '', index) =>{
//     let dlt = confirm(`Delete this trip?`);
//     if(dlt === false) return;
//     try {
//         await fetch(baseUrl, {
//             method:"DELETE",
//             mode:"cors",
//             headers:{
//                 'Content-Type':'application/json'
//             },
//             body: JSON.stringify({id:index})
//         });
//         await updateUI();
//     }catch (e){
//         console.log(e);
//     }
// }
//To fetch data from the weather api

export const getWeatherData = async (baseUrl, key, data, startDate) => {
    const response = await fetch(`${baseUrl}lat=${data['lat']}&lon=${data['lng']}&key=${key}`);
    try {
        const dataWeather = await response.json();
        console.log(dataWeather);
        return dataWeather;
    } catch (error) {
        console.log(error);
    }
}

//To get the data saved on the server

export const getDataFromServer = async (baseurl) => {
    const weatherdata = await fetch(baseurl);
    try {
        const getData = weatherdata.json();
        return getData;
    } catch (error) {
        console.log("server error" + error);
    }
}
export function updateUI(getData) {
    const pixaUrl = "https://pixabay.com/api/?key=";
    const key = '16060501-e2d3132e99ce2be48e2344f5f';
    getPixaBayImages(pixaUrl, key, getData);

}

export const getPixaBayImages = async (url, key, getData) => {
    const length = getData['length'] - 1;
    console.log(getData['length']);
    const response = await fetch(`${url}${key}&q=${getData[length]['cityname']}+city&image_type=photo`);
    try {
        const image1 = await response.json();
        Client.updateInterface(getData, image1);
    } catch (error) {
        console.log(error);
    }
}

const submit = document.getElementById('submit');
submit.addEventListener('click', onCreate);
submit.addEventListener('onmousedown', onCreate);
// export {deleteTrip};