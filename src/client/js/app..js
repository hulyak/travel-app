//UI Elements
const submit = document.querySelector('#save-button');
submit.addEventListener('click', createTrip);
const city = document.getElementById("city");
const startDate = document.getElementById("start-date");
const endDate = document.getElementById("end-date");
const errorText = document.getElementById("error-text");
const trips = document.getElementById("trips");
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