const createTrip = async  (
    city, start_date, end_date, duration, weather, temp, imageUrl
 ) => {
     //create container
    const tripContainer = document.createElement("div");
    tripContainer.classList.add("trip");
    //create image
    const cityImage = document.createElement("img");
    cityImage.setAttribute("src", imageUrl);
    tripContainer.appendChild(cityImage);
    //destination container
    const destinationContainer = createContainer("destination-container", "Destination: ", city);
    tripContainer.appendChild(destinationContainer);
    //start-date container
    const startDateContainer = createContainer("start-date-container", "Departure date: ", start_date);
    tripContainer.appendChild(startDateContainer);
    //end-date container
    const endDateContainer = createContainer("end-date-container" , "Return Date: ", end_date);
    tripContainer.appendChild(endDateContainer);
    //duration-container
    const durationContainer = createContainer("duration-container","Duration : ", duration + " days away");
    tripContainer.appendChild(durationContainer);
    //weatherInfo container
    const weatherInfoContainer = createContainer("weather-info-container","Weather will be like ", `${weather_summary} <br/> Temperature:${temp}${String.fromCharCode(176)}C`);
    tripContainer.appendChild(weatherInfoContainer);
    return tripContainer;
 };

 const createContainer = (className, label, value) => {
     const container = document.createElement("div");
     container.classList.add(className);

     const tripLabel = document.createElement("div");
     tripLabel.classList.add("trip-label");
     tripLabel.textContent = label;
     container.appendChild(tripLabel);

     const tripValue = document.createElement("div");
     tripValue.classList.add("trip-value");
     tripValue.innerHTML = value ;
     container.appendChild(tripValue);

     return container;
 }
 module.exports = {createTrip};