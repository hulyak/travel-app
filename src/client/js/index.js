const {calculateTime} = require('./calculateTime');
const {createTrip} = require('./createTrip');

//UI Elements
const submit = document.querySelector('#save-button');
const destination = document.getElementById("city");
const startDate = document.getElementById("start-date");
const endDate = document.getElementById("end-date");
const errorText = document.getElementById("error-text");
const myTripsContainer = document.getElementById("trips");
//Post request to server
const sendRequestToServer = async (city = '', start_date = '', end_date = '', date = '') => {
	const tripData = {
		city, start_date, end_date, date
	};
	const response = await fetch("http://localhost:3000/fetchInfo" , {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({tripData}) // body data type must match "Content-Type" header
	});
	try {
		const data = await response.json();
		return data;
	} catch (error) {
		console.log('error', error);
	}
};

const formSubmitHandler = () => {
	const city = destination.value;
	const start_date = startDate.value;
	const end_date = endDate.value;
	const dateInUnix = new Date(start_date).getTime() / 1000;

	const diff = calculateTime(start_date, end_date);
	if (diff === "error") {
		errorText.setAttribute("display", "block");
		errorText.textContent = "Check the dates";
		return;
	}
	errorText.textContent = "";
	errorText.setAttribute("display", "none");

	sendRequestToServer(city, start_date, end_date, dateInUnix).then(data => {
		const tripContainer = createTrip(
			data.city,
			data.startDate,
			data.endDate,
			diff,
			data.weather,
			data.temp,
			data.timezone,
			data.cityImageUrl
		);
		myTripsContainer.appendChild(tripContainer);
		submit.textContent = "Save trip";
	});
}

module.exports = { formSubmitHandler};