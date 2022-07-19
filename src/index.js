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

  //Weather Icon
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    "alt",
    `${response.data.weather[0].description}`
  );

  //Customized Weather Icons Using API Data
  let weatherIcon = response.data.weather[0].icon;
  console.log(weatherIcon);

  if (weatherIcon === "01d") {
    iconElement.setAttribute("src", "/media/JSmedia/01d-alt.png");
  }
  if (weatherIcon === "02d") {
    iconElement.setAttribute("src", "/media/JSmedia/02d-alt.png");
  }
  if (weatherIcon === "03d") {
    iconElement.setAttribute("src", "/media/JSmedia/03d-alt.png");
  }
  if (weatherIcon === "04d") {
    iconElement.setAttribute("src", "/media/JSmedia/04d-alt.png");
  }
  if (weatherIcon === "09d") {
    iconElement.setAttribute("src", "/media/JSmedia/09d-alt.png");
  }
  if (weatherIcon === "10d") {
    iconElement.setAttribute("src", "/media/JSmedia/10d-alt.png");
  }
  if (weatherIcon === "11d") {
    iconElement.setAttribute("src", "/media/JSmedia/11d-alt.png");
  }
  if (weatherIcon === "13d") {
    iconElement.setAttribute("src", "/media/JSmedia/13d-alt.png");
  }
  if (weatherIcon === "50d") {
    iconElement.setAttribute("src", "/media/JSmedia/50d-alt.png");
  }
}

function search(city) {
  apiKey = "1a915758c5fb84c9ee7377f6039e76a7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  console.log(apiUrl);

  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");

  search(searchInputElement.value);
  console.log(searchInputElement.value);
  //searchInputElement.innerHTML
}

search("Swakopmund");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
