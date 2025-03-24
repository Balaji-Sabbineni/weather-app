const API_KEY = "6f424da9bdc681c810033af3f2577dbf";
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

let btn = document.getElementById("btn");
btn.addEventListener("click", () => fetchWeather());

let weather;
async function fetchWeather() {
  let city = document.getElementById("inp").value;
  if (!city) {
    console.log("Please enter a city name.");
    return;
  }
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    let response = await fetch(url);
    let data = await response.json();
    weather = data;

    let parent = document.getElementById("data");
    parent.innerHTML = "";

    let cityTitle = document.createElement('p');
    cityTitle.setAttribute('id', 'cityTitle');
    let temp = document.createElement("p");
    let humidity = document.createElement("p");
    let pressure = document.createElement("p");
    let lowTemp = document.createElement("p");
    let highTemp = document.createElement("p");
    let condition = document.createElement('p');

    cityTitle.innerHTML = `<b>City: ${city}</b>`;
    temp.textContent = `Temperature: ${weather.main.temp}°C`;
    humidity.textContent = `Humidity: ${weather.main.humidity}`;
    pressure.textContent = `Pressure: ${weather.main.pressure}`;
    lowTemp.textContent = `Low: ${weather.main.temp_min}°C`;
    highTemp.textContent = `High: ${weather.main.temp_max}°C`;
    condition.textContent =  `Condition: ${weather.weather[0].description}`;

    parent.appendChild(cityTitle);
    parent.appendChild(temp);
    parent.appendChild(humidity);
    parent.appendChild(pressure);
    parent.appendChild(lowTemp);
    parent.appendChild(highTemp);
    parent.appendChild(condition);

    let fcities = JSON.parse(localStorage.getItem("fcities")) || [];
    if (!fcities.includes(city)) {
      fcities.push(city);
      localStorage.setItem("fcities", JSON.stringify(fcities));
    }

    displayCities(fcities);
  } catch (error) {
    console.log(error);
  }
}

async function displayWeather(city) {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
  let weather;
  try {
    let response = await fetch(url);
    let data = await response.json();
    weather = data;
  } catch (error) {
    console.log(error);
  }
  let parent = document.getElementById("data");
  parent.innerHTML = "";

  let cityTitle = document.createElement('p');
  cityTitle.setAttribute('id', 'cityTitle');
  let temp = document.createElement("p");
  let humidity = document.createElement("p");
  let pressure = document.createElement("p");
  let lowTemp = document.createElement("p");
  let highTemp = document.createElement("p");
  let condition = document.createElement('p');

  cityTitle.innerHTML = `<b>City: ${city}</b>`;
  temp.textContent = `Temperature: ${weather.main.temp}°C`;
  humidity.textContent = `Humidity: ${weather.main.humidity}`;
  pressure.textContent = `Pressure: ${weather.main.pressure}`;
  lowTemp.textContent = `Low: ${weather.main.temp_min}°C`;
  highTemp.textContent = `High: ${weather.main.temp_max}°C`;
  condition.textContent =  `Condition: ${weather.weather[0].description}`;

  parent.appendChild(cityTitle);

  parent.appendChild(temp);
  parent.appendChild(humidity);
  parent.appendChild(pressure);
  parent.appendChild(lowTemp);
  parent.appendChild(highTemp);
  parent.appendChild(condition);
}

function displayUl(fcities,city){
  fcities = JSON.parse(localStorage.getItem('fcities')) || [];
  let index = fcities.indexOf(city);

  if (index !== -1) {
    let new_city = prompt('Enter the new city name');
    if (new_city) {
      fcities[index] = new_city;
      localStorage.setItem("fcities", JSON.stringify(fcities));
    }
  }
  displayCities(fcities);
}

function displayCities(fcities) {
  let cities = JSON.parse(localStorage.getItem('fcities')) || [];

  let favcities = document.querySelector("#favcities");
  if (!favcities) {
    favcities = document.createElement("ul");
    favcities.id = "favcities";
    document.body.appendChild(favcities);
  }

  favcities.innerHTML = "";

  cities.forEach(city => {
    let favcity = document.createElement("li");
    favcity.textContent = city;

    let editbtn = document.createElement("button");
    editbtn.setAttribute("id", "editbtn");
    editbtn.textContent = "Edit";
    editbtn.addEventListener('click', async () => {
      document.getElementById('inp').value = city;
      displayUl(fcities, city);
    });

    let deletebtn = document.createElement("button");
    deletebtn.setAttribute("id", "deletebtn");
    deletebtn.textContent = "Delete";
    deletebtn.addEventListener("click", () => {
      let index = cities.indexOf(city);
      if (index !== -1) {
        cities.splice(index, 1);
        localStorage.setItem("fcities", JSON.stringify(cities));
        displayCities(fcities);
      }
    });

    let showWeather = document.createElement("button");
    showWeather.setAttribute("id", "showbtn");
    showWeather.textContent = "Show Weather";
    showWeather.addEventListener("click", () => {
      document.getElementById("inp").value = city;
      displayWeather(city);
    });

    favcity.appendChild(editbtn);
    favcity.appendChild(deletebtn);
    favcity.appendChild(showWeather);

    favcities.appendChild(favcity);
  });
}
