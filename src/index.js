//API CALL FOR UPCOMING WEATHER FORECAST USING LONG&LAT
function getForcast(coordinates) {
  console.log(coordinates);

  let apiKey = "1a915758c5fb84c9ee7377f6039e76a7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;

  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

//UPCOMING WEATHER FORECAST FORMATING DAY OF THE WEEK
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

//CURRENT WEATHER, DATE AND TIME
function displayTemp(response) {
  console.log(response.data);
  console.log(response.data.main.temp);

  //#today div
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.name;

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let windSpeedElement = document.querySelector("#windspeed");
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed) + " km/h";

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity + "%";

  //Date-Time
  let now = new Date();

  let timeElement = document.querySelector("#current-date");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  let day = days[now.getDay()];
  let date = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  timeElement.innerHTML = `${day}, ${date}/${month}/${year} </br> Local time ${hours}:${minutes}`;

  //

  tempCelcius = Math.round(response.data.main.temp);

  //Weather Icon
  let iconElement = document.querySelector("#icon"); //#weather-icon-1
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`, //maybe change ${} to forecastDay = response.data.daily[0].weather[0].icon
    "alt",
    `${response.data.weather[0].description}` //maybe change ${} to forecastDay = response.data.daily[0].weather[0].main
  );

  /*CUSTOM WEATHER ICON
  //Customized Weather Icons Using API Data
  let weatherIcon = response.data.weather[0].main; //response.data.daily[0].weather[0].main
  console.log(weatherIcon);

  if (weatherIcon === "Thunderstorm") {
    iconElement.setAttribute("src", "/media/JSmedia/11d-alt.png");
  }
  if (weatherIcon === "Drizzle") {
    iconElement.setAttribute("src", "/media/JSmedia/10d-alt.png");
  }
  if (weatherIcon === "Rain") {
    iconElement.setAttribute("src", "/media/JSmedia/09d-alt.png");
  }
  if (weatherIcon === "Snow") {
    iconElement.setAttribute("src", "/media/JSmedia/13d-alt.png");
  }
  if (weatherIcon === "Clear") {
    iconElement.setAttribute("src", "/media/JSmedia/01d-alt.png");
  }
  if (weatherIcon === "Clouds") {
    iconElement.setAttribute("src", "/media/JSmedia/03d-alt.png");
  }*/

  getForcast(response.data.coord);
}

//SEARCH BAR INPUT VALUE TO API
function search(city) {
  apiKey = "1a915758c5fb84c9ee7377f6039e76a7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  console.log(apiUrl);

  axios.get(apiUrl).then(displayTemp);
}

//HTML in JS
function displayForecast(response) {
  console.log(response.data.daily);

  let upcomingForcast = response.data.daily;

  let forecastElement = document.querySelector("#upcoming-weather");

  let forecastHTML = `<div class="row justify-content-center" id="upcoming-weather">`;

  upcomingForcast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      
            <span class="card col-2 shadow-sm" id="card-1">
              <div class="card-day" id="card-day-1">${formatForecastDay(
                forecastDay.dt
              )}</div>
              
              <div>    
                <img
                  src= "http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt="${forecastDay.weather[0].description}"
                  id="weekday-icon-1"
                  width="70px"
                />
              </div>
              <div>
                <span class="daily-minimum" id="daily-minimum-1">${Math.round(
                  forecastDay.temp.min
                )}°</span>
                /<span class="daily-maximum" id="daily-maximum-1">${Math.round(
                  forecastDay.temp.max
                )}° </span>
              </div>
            </span>
            
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
  //console.log(forecastHTML);
}

//STORES VALUE OF SEARCH BAR INPUT
function handleSubmit(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");

  search(searchInputElement.value);
  console.log(searchInputElement.value);
  //searchInputElement.innerHTML
}

//TEMPERATURE CONVERSION C TO F
function displayFarenheitTemp(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#current-temp");
  celciusLink.classList.remove("active");
  farenheitLink.classList.add("active");

  let tempFarenheit = Math.round((tempCelcius * 9) / 5 + 32);
  temperatureElement.innerHTML = tempFarenheit;

  //alert(tempFarenheit);
}

//TEMPERATURE CONVERSION F TO C
function displayCelciusTemp(event) {
  event.preventDefault();

  celciusLink.classList.add("active");
  farenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(tempCelcius);

  //alert(tempCelcius);
}

//CURRENT CITY BUTTON
function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-city-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
currentLocationButton.addEventListener("click", displayCelciusTemp);

//CALLS MADE UPON PAGE LOADING
let tempCelcius = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
form.addEventListener("submit", displayCelciusTemp);

let farenheitLink = document.querySelector("#temp-farenheit");
farenheitLink.addEventListener("click", displayFarenheitTemp);

let celciusLink = document.querySelector("#temp-celsius");
celciusLink.addEventListener("click", displayCelciusTemp);

search("Swakopmund");

//---------------------------------------------------------------------
//Please refer to "/test/jstests.js" for process work
