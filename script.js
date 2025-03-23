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
  console.log(city);
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    let response = await fetch(url);
    let data = await response.json();
    weather = data;

    let parent = document.getElementById("data");
    parent.innerHTML = "";

    let temp = document.createElement("p");
    let humidity = document.createElement("p");
    let pressure = document.createElement("p");
    let lowTemp = document.createElement("p");
    let highTemp = document.createElement("p");

    temp.textContent = `Temperature: ${weather.main.temp}°C`;
    humidity.textContent = `Humidity: ${weather.main.humidity}`;
    pressure.textContent = `Pressure: ${weather.main.pressure}`;
    lowTemp.textContent = `Low: ${weather.main.temp_min}°C`;
    highTemp.textContent = `High: ${weather.main.temp_max}°C`;

    parent.appendChild(temp);
    parent.appendChild(humidity);
    parent.appendChild(pressure);
    parent.appendChild(lowTemp);
    parent.appendChild(highTemp);

    let fcities = JSON.parse(localStorage.getItem("fcities")) || [];
    if (!fcities.includes(city)) {
      fcities.push(city);
      localStorage.setItem("fcities", JSON.stringify(fcities));
    }

    let favcities = document.querySelector("#favcities");
    if (!favcities) {
      favcities = document.createElement("ul");
      favcities.id = "favcities";
    }

    if (
      !Array.from(favcities.children).some((li) =>
        li.textContent.includes(city)
      )
    ) {
      let favcity = document.createElement("li");
      favcity.textContent = city;

      let editbtn = document.createElement("button");
      editbtn.setAttribute("id", "editbtn");
      editbtn.textContent = "Edit";
      // editbtn.addEventListener('click', () => {
      //     document.getElementById('inp').value = city;
      //     fetchWeather();
      // });

      let deletebtn = document.createElement("button");
      deletebtn.setAttribute("id", "deletebtn");
      deletebtn.textContent = "Delete";
      deletebtn.addEventListener("click", () => {
        let index = fcities.indexOf(city);
        fcities.splice(index, 1);
        localStorage.setItem("fcities", JSON.stringify(fcities));
        favcities.removeChild(favcity);
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
    }
    document.body.appendChild(favcities);
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

  let temp = document.createElement("p");
  let humidity = document.createElement("p");
  let pressure = document.createElement("p");
  let lowTemp = document.createElement("p");
  let highTemp = document.createElement("p");

  temp.textContent = `Temperature: ${weather.main.temp}°C`;
  humidity.textContent = `Humidity: ${weather.main.humidity}`;
  pressure.textContent = `Pressure: ${weather.main.pressure}`;
  lowTemp.textContent = `Low: ${weather.main.temp_min}°C`;
  highTemp.textContent = `High: ${weather.main.temp_max}°C`;

  parent.appendChild(temp);
  parent.appendChild(humidity);
  parent.appendChild(pressure);
  parent.appendChild(lowTemp);
  parent.appendChild(highTemp);
}
