/* Global Variables */

const button = document.getElementById('generate');

const city = document.getElementById('city');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
// Base URL and API Key for weatherBit API
const weatherbitApi = '04fa6da2d39e4f31b3d25b6d75ad1c84';
const baseURL = 'http://api.weatherbit.io/v2.0/current';

http: //api.geonames.org/postalCodeSearch?postalcode=9011&maxRows=10&username=demo
    // Create a new date instance dynamically with JS
    let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Async GET
const retrieveData = async (baseURL, zip, apiKey) => {
    try {
        const request = await fetch(baseURL + zip + '&appid=' + apiKey + '&units=imperial');
        const allData = await request.json();
        const {
            main: {
                temp
            }
        } = allData;
        return temp;
    } catch (error) {
        console.log('error', error);
    }
};
//chained promises to get and post data
button.addEventListener('click', performAction);

//select the actual value of an HTML input to include in POST
function performAction(e) {
    const newZip = zip.value;
    const feeling = feelings.value;
    //api call
    retrieveData(baseURL, newZip, apiKey).then(function (temp) {
        postData('/add', {
                date: newDate,
                temp,
                content: feeling
            })
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                console.log(responseData);
                updateUI(responseData.date, responseData.temp, responseData.content);
            });
    });
}
// Async POST
const postData = async (url = '', data = {}) => {
    try {
        return await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
    } catch (error) {
        console.log('error', error);
    }
};

const updateUI = async (temperature, newDate, feelings) => {
    date.innerHTML = newDate;
    temp.innerHTML = temperature;
    content.innerHTML = feelings;
};