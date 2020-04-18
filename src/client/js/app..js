const submit = document.querySelector('#save-button');
submit.addEventListener('click', createTrip);
const city = document.getElementById("city");
const startDate = document.getElementById("start-date");
const endDate = document.getElementById("end-date");
const errorText = document.getElementById("error-text");
const trips = document.getElementById("trips");

export function formSubmitHandler() {
	const place = document.getElementById("city").value;
	const startdate = document.getElementById("start-date").value;
	const enddate = document.getElementById("end-date").value;
	const dateInUnix = new Date(startdate).getTime() / 1000;

	const diff = calculateTime(startdate, enddate);
	if (diff === "error") {
		errorText.setAttribute("display", "block");
		errorText.textContent = "Check the dates";
		return;
	}
	errorText.textContent = "";
	errorText.setAttribute("display", "none");

	sendRequestToServer(city, startdate, enddate, dateInUnix).then(data => {
		const trip = createTrip(
			data.city,
			data.startDate,
			data.endDate,
			diff,
			data.weatherSummary,
			data.lowTemp,
			data.highTemp,
			data.cityImageUrl
		);
		trips.appendChild(trip);
		submit.textContent = "Save trip";
	});
}
//example request
//https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=API_KEY
function callGeonames(place, date) {
	const baseUrl = 'http://api.geonames.org/geoCodeAddressJSON?q=';
	const username = 'hulya';
	fetchLatLong(place, baseUrl, username).then((data) => {
		const baseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
		const weatherAPI = '04fa6da2d39e4f31b3d25b6d75ad1c84';

		getForecastWeather(baseUrl, weatherAPI, data, start - date, end - date).then((weatherData) => {
			postData('http://localhost:2000/weatherdata', {
				weather: wData,
				start - date: startdate,
				end - date: enddate,
				cityname: place
			}).then(function (server) {
				getDataFromServer('http://localhost://2000/getWeather').then(function (getData) {
					updateUI(getData);
				});
			});
		});
	});
}

//Fetch latitude/longitude From GEONAMES API
const fetchLatLong = async (place, baseUrl, username) => {
	let coord = {
		lang: '',
		lat: ''
	};
	const response = await fetch(`${baseUrl}${place}&maxRows=1&username=${username}`);
	try {
		const data = await response.json();
		coord['lng'] = data['address']['lng'];
		coord['lat'] = data['address']['lat'];

		return coord;
	} catch (error) {
		console.log("error", error)
	}
};

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
};

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
};

//Get Data Saved on the server
const getDataFromServer = async (baseurl) => {
	const weatherdata = await fetch(baseurl);
	try {
		const getData = weatherdata.json();
		return getData;
	} catch (error) {
		console.log(error);
	}
};

//Update UI
const updateUI = async (getData) => {
	const pixabayUrl = 'https://pixabay.com/api/?key=';
	const key = '16060501-e2d3132e99ce2be48e2344f5f';
	getPixabayImages(pixabayUrl, key, getData);
};

//Fech Images from Pixabay Api
const getPixabayImages = async (url, key, getData) => {
	const length = input['length'] - 1;
	console.log(input['length']);
	const response = await fetch(`${url}${key}&q=${getData[length]['cityname']}+city&image_type=photo`);
	try {
		const image = await response.json();
		Client.changeUI(input, image);
	} catch (error) {
		console.log(error);
	}
};

export {
	callGeonames
};