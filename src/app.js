// Day, date and time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let today = document.querySelector(".today");
today.innerHTML = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];
let year = now.getFullYear();
let date = now.getDate();

let currentDate = document.querySelector(".dateToday");
currentDate.innerHTML = `${date} ${month} ${year}`;

let currentTime = document.querySelector(".time");
currentTime.innerHTML = now.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

//Code for city and temp calls

let form = document.querySelector(".d-flex");
form.addEventListener("submit", handleSearch);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let iconElement = document.querySelector("#weather-icon");

  let descriptionElement = document.querySelector("#description");
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".todayTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  celsiusTemp = response.data.main.temp;
  descriptionElement.innerHTML = response.data.weather[0].description;
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

//Search Engine

function handleSearch(event) {
  event.preventDefault();
  let searchResult = document.querySelector("#search-input");
  searchCity(searchResult.value);
}

function search(event) {
  event.preventDefault();
  let currentCity = document.querySelector(".city");
  let searchResult = document.querySelector("#search-input");

  currentCity.innerHTML = searchResult.value;
}
// Convert units
function showFahrTemp(event) {
  event.preventDefault();
  let fahrTemp = (celsiusTemp * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let temperatureElement = document.querySelector(".todayTemp");
  temperatureElement.innerHTML = Math.round(fahrTemp);
}
function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".todayTemp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrTemp);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);
