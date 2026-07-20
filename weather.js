// Variable Declaration
let cityValue = "";
const ApiKey = "2076e4e2098b7342c55fe32560d9f5be";
const ApiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const search = document.querySelector(".search");
const input = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const windspeed = document.querySelector(".wind");
const weatherImage = document.querySelector(".weather img");
const errors = document.querySelector(".error");

// Async Function

async function checkweather(city) {
  const response = await fetch(ApiURL + city + `&appid=${ApiKey}`);
  const data = await response.json();
  console.log(data);

  return data;
}

// Search Button

searchbtn.addEventListener("click", () => {
  if (input.value.trim() === "") {
    errors.style.display = "block";
    errors.textContent = "⚠️ Please enter a city name.";
    return;
  }
  cityValue = input.value;
  checkweather(cityValue)
    .then((data) => {
      if (data.cod == "404") {
        errors.style.display = "block";
        errors.textContent =
          "❌ City not found. Please enter a valid city name.";
      }
      errors.style.display = "none";
      const cityhumidity = data.main.humidity;
      const citytemp = data.main.temp;
      const cityspeed = data.wind.speed;
      const searchCity = data.name;
      const cityImage = data.weather[0].main;
      city.textContent = searchCity;
      humidity.textContent = cityhumidity + "%";
      temp.textContent = citytemp + "°C";
      windspeed.textContent = cityspeed + "Km/h";
      if (cityImage == "Clouds") {
        weatherImage.src = "./images/clouds.png";
      } else if (cityImage == "Clear") {
        weatherImage.src = "./images/clear.png";
      } else if (cityImage == "Drizzle") {
        weatherImage.src = "./images/drizzle.png";
      } else if (cityImage == "Mist") {
        weatherImage.src = "./images/mist.png";
      } else if (cityImage == "Rain") {
        weatherImage.src = "./images/rain.png";
      } else if (cityImage == "Snow") {
        weatherImage.src = "./images/snow.png";
      }
    })
    .catch((error) => {
      errors.style.display = "block";
      errors.textContent = "❌ Invalid city name.";
      console.log(error);
    });
});
