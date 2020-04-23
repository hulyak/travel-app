const {calculateTime} = require('./calculateTime');
const {createTrip} = require('./createTrip');

//UI Elements
const errorText = document.getElementById("error-text");
const myTripsContainer = document.getElementById("trips");
//Post request to server
const sendRequestToServer = async (city, start_date, end_date, date) => {
	const tripData = {
		city, start_date, end_date, date
	};

	let response = await fetch("http://localhost:3000/trips" , {
		method: 'POST',
		// mode : 'cors',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({tripData}) // body data type must match "Content-Type" header
	});

	try {
		const data = await response.json();
		return data;
} 
		catch (error) {
		console.log('error', error);
	}
};

let formSubmitHandler = async (event) => {
	console.log('DOM fully loaded and parsed.');
	const saveBtn = document.querySelector('#save-button');
	saveBtn.addEventListener('click', async e => {
		e.preventDefault();
		const destination = document.getElementById("city").value.trim();
		const start_date = document.getElementById("start-date").value;
		const end_date =document.getElementById("end-date").value;
		const dateInUnix = new Date(start_date).getTime() / 1000;
		const diff = calculateTime(start_date, end_date);

		if (destination == '' || start_date == '' || end_date == ''){
			alert('Please enter a valid city and date!')
		}
		else if (diff === "error") {
			errorText.setAttribute("display", "block");
			errorText.textContent = "Check the dates";
			alert("Check the dates");
			return;
		}
		errorText.textContent = "";
		errorText.setAttribute("display", "none");

		try {
			await sendRequestToServer(city, start_date, end_date, dateInUnix).then(data => {
				const tripContainer = createTrip(
					data.city,
					data.startDate,
					data.endDate,
					diff,
					data.weather,
					data.temp,
					data.cityImageUrl
				);
				myTripsContainer.appendChild(tripContainer);
				saveBtn.textContent = "Save trip";
			});
			// await sendRequestToServer("http://localhost:3000/trips", {destination, start_date, end_date,dateInUnix, diff});
			// await createTrip(city, startDate, endDate, diff, weather, temp, cityImageUrl);
		}
		catch(e) {
			alert("Please try again!");
			console.log(e);
		}
	})
}

module.exports = { formSubmitHandler};
