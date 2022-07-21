//HTML in JS
function displayForecast(response) {
  console.log(response.data.daily);

  let forecastElement = document.querySelector("#card-day-1");
  forecastElement.innerHTML = "Forecast";

  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="row justify-content-center" id="upcoming-weather">
            <span class="card col-2 shadow-sm" id="card-1">
              <div class="card-day" id="card-day-1">Fri</div>
              <div>
                <img
                  src="media/dead/1530364_rain_storm_shower_weather.png"
                  alt="Rain Storm"
                  id="weekday-icon-1"
                  width="70px"
                />
              </div>
              <div>
                <span class="daily-minimum" id="daily-minimum-1"> 23°</span>
                /<span class="daily-maximum" id="daily-maximum-1"> 38° </span>
              </div>
            </span>
            
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//TEMPERATURE USING COORDINATES FOR DAILY FORECAST
function getForcast(coordinates) {
  console.log(coordinates);

  let apiKey = "1a915758c5fb84c9ee7377f6039e76a7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;

  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

//CURRENT WEATHER
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
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    "alt",
    `${response.data.weather[0].description}`
  );

  /*//Customized Weather Icons Using API Data
  let weatherIcon = response.data.weather[0].main;
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

  function search(city) {
    apiKey = "1a915758c5fb84c9ee7377f6039e76a7";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    console.log(apiUrl);

    axios.get(apiUrl).then(displayTemp);
    console.log(search);
  }
  /*
// DISPLAY FORECAST (need to loop through this function for each card)

function displayForecast(response) {
  /* let forecastArray = response.data.daily;
  console.log(response.data.daily);

  //let forecastElement = document.querySelector("#card-1");
  //forecastElement.innerHTML = forecast;

  //What do you need to change:
  //-Day of week
  //-Weather icon
  //-Min/Max temp

  //Create an array of objects to store daily forecast data???
  let forecastArray = [
    {
      dt: response.data.daily[0].dt,
      icon: response.data.daily[0].weather[0].main,
      max: response.data.daily[0].temp.max,
      min: response.data.daily[0].temp.min,
    },
    /* {
      dt: response.data.daily[1].dt,
      icon: response.data.daily[0].weather[0].main,
      max: response.data.daily[1].temp.max,
      min: response.data.daily[1].temp.min,
    },
    {
      dt: response.data.daily[2].dt,
      icon: response.data.daily[0].weather[0].main,
      max: response.data.daily[2].temp.max,
      min: response.data.daily[2].temp.min,
    },
    {
      dt: response.data.daily[3].dt,
      icon: response.data.daily[0].weather[0].main,
      max: response.data.daily[3].temp.max,
      min: response.data.daily[3].temp.min,
    },
    {
      dt: response.data.daily[4].dt,
      icon: response.data.daily[0].weather[0].main,
      max: response.data.daily[4].temp.max,
      min: response.data.daily[4].temp.min,
    },
    {
      dt: response.data.daily[5].dt,
      icon: response.data.daily[0].weather[0].main,
      max: response.data.daily[5].temp.max,
      min: response.data.daily[5].temp.min,
    },
    {
      dt: response.data.daily[6].dt,
      icon: response.data.daily[0].weather[0].main,
      max: response.data.daily[6].temp.max,
      min: response.data.daily[6].temp.min,
    },
    {
      dt: response.data.daily[7].dt,
      icon: response.data.daily[0].weather[0].main,
      max: response.data.daily[7].temp.max,
      min: response.data.daily[7].temp.min,
    },
    {
      dt: response.data.daily[8].dt,
      icon: response.data.daily[0].weather[0].main,
      max: response.data.daily[8].temp.max,
      min: response.data.daily[8].temp.min,
    },
  ];
  console.log(forecastArray[0].dt);

  //
  let weekDay = document.querySelector("#card-day-1");
  weekDay.innerHTML = response.data.daily[0].dt;
  console.log(weekDay);

  //WEEKDAY ICON

  let weekDayIcon = document.querySelector("#weekday-icon-1");
  weekDayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.daily[0].weather[0].icon}@2x.png`,
    "alt",
    `${response.data.daily[0].weather[0].description}`
  );

  //
  let weatherIcon = response.data.daily[0].weather[0].main;
  console.log(weatherIcon);

  if (weatherIcon === "Thunderstorm") {
    weekDayIcon.setAttribute("src", "/media/JSmedia/11d-alt.png");
  }
  if (weatherIcon === "Drizzle") {
    weekDayIcon.setAttribute("src", "/media/JSmedia/10d-alt.png");
  }
  if (weatherIcon === "Rain") {
    weekDayIcon.setAttribute("src", "/media/JSmedia/09d-alt.png");
  }
  if (weatherIcon === "Snow") {
    weekDayIcon.setAttribute("src", "/media/JSmedia/13d-alt.png");
  }
  if (weatherIcon === "Clear") {
    weekDayIcon.setAttribute("src", "/media/JSmedia/01d-alt.png");
  }
  if (weatherIcon === "Clouds") {
    weekDayIcon.setAttribute("src", "/media/JSmedia/03d-alt.png");
  }

  /* let weekDayIcon = document.querySelector("#weekday-icon-1");
  weekDayIcon.setAttribute =
    ("src",
    `http://openweathermap.org/img/wn/${response.data.daily[0].weather[0].icon}@2x.png`,
    "alt",
    `${response.data.daily[0].weather[0].description}`);

  console.log(response.data.daily[0].weather[0].description);

  //
  let dailyMinTemp = document.querySelector("#daily-minimum-1");
  dailyMinTemp.innerHTML = response.data.daily[0].temp.min;
  console.log(dailyMinTemp);

  //
  let dailyMaxTemp = document.querySelector("#daily-maximum-1");
  dailyMaxTemp.innerHTML = response.data.daily[0].temp.max;
  console.log(dailyMaxTemp);
}*/
}

//SEARCH ENGINE
function handleSubmit(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");

  search(searchInputElement.value);
  console.log(searchInputElement.value);
  //searchInputElement.innerHTML
}

//TEMPERATURE CONVERSION
function displayFarenheitTemp(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#current-temp");
  celciusLink.classList.remove("active");
  farenheitLink.classList.add("active");

  let tempFarenheit = Math.round((tempCelcius * 9) / 5 + 32);
  temperatureElement.innerHTML = tempFarenheit;

  //alert(tempFarenheit);
}

function displayCelciusTemp(event) {
  event.preventDefault();

  celciusLink.classList.add("active");
  farenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(tempCelcius);

  //alert(tempCelcius);
}

let tempCelcius = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#temp-farenheit");
farenheitLink.addEventListener("click", displayFarenheitTemp);

let celciusLink = document.querySelector("#temp-celsius");
celciusLink.addEventListener("click", displayCelciusTemp);

search("Swakopmund");

displayForecast();

/*//HTML IN JS
function displayForecast(response) {
  console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecast");

  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="row justify-content-center" id="upcoming-weather">
            <span class="card col-2 shadow-sm" id="card-1">
              <div class="card-day" id="card-day-1">Fri</div>
              <div>
                <img
                  src="media/dead/1530364_rain_storm_shower_weather.png"
                  alt="Rain Storm"
                  id="weekday-icon-1"
                  width="70px"
                />
              </div>
              <div>
                <span class="daily-minimum" id="daily-minimum-1"> 23°</span>
                /<span class="daily-maximum" id="daily-maximum-1"> 38° </span>
              </div>
            </span>
            
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
*/

//HTML in JS OPT1
/*function displayForecast(response) {
  //console.log(response.data.daily);

  let forecastElement = document.querySelector("#upcoming-weather");
  // forecastElement.innerHTML = "Forecast";

  let days = ["c1", "c2", "c3"];

  let forecastHTML = `<div class="row" >`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="row justify-content-center" id="upcoming-weather">
            <span class="card col-2 shadow-sm" id="card-1">
              <div class="card-day" id="card-day-1">Fri</div>
              <div>
                <img
                  src="media/dead/1530364_rain_storm_shower_weather.png"
                  alt="Rain Storm"
                  id="weekday-icon-1"
                  width="70px"
                />
              </div>
              <div>
                <span class="daily-minimum" id="daily-minimum-1"> 23°</span>
                /<span class="daily-maximum" id="daily-maximum-1"> 38° </span>
              </div>
            </span>
            
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}*/

//HTML in JS OPT 2
function displayForecast() {
  let forecastElement = document.querySelector("#upcoming-weather");

  //let days = ["Thu", "Fri"];

  let forecastHTML = `<div class="row" id="upcoming-weather">`;
  //days.forEach(
    function (day) {
    forecastHTML =
      forecastHTML +
      `
      
            <span class="card col-2 shadow-sm" id="card-1">
              <div class="card-day" id="card-day-1">Fri</div>
              <div>
                <img
                  src="media/dead/1530364_rain_storm_shower_weather.png"
                  alt="Rain Storm"
                  id="weekday-icon-1"
                  width="70px"
                />
              </div>
              <div>
                <span class="daily-minimum" id="daily-minimum-1"> 23°</span>
                /<span class="daily-maximum" id="daily-maximum-1"> 38° </span>
              </div>
            </span>
  `;
    forecastHTML =
      forecastHTML +
      `
      <div  id="upcoming-weather">
            <span class="card col-2 shadow-sm" id="card-1">
              <div class="card-day" id="card-day-1">Fri</div>
              <div>
                <img
                  src="media/dead/1530364_rain_storm_shower_weather.png"
                  alt="Rain Storm"
                  id="weekday-icon-1"
                  width="70px"
                />
              </div>
              <div>
                <span class="daily-minimum" id="daily-minimum-1"> 23°</span>
                /<span class="daily-maximum" id="daily-maximum-1"> 38° </span>
              </div>
            </span>
  `;
  };

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
