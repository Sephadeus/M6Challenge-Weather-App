const searchBtn = document.getElementById("searchBtn");

const searchResults = document.getElementById("search-results");
searchBtn.addEventListener("click", citySearch);

function citySearch(event) {
    event.preventDefault();
    var cityInputVal = document.querySelector('#search-input').value;

    searchResults.innerHTML = ""; 

    if (!cityInputVal) {
      console.error('You need a search input value!');
      alert('You need a search input value!');
      return;
    } 
    searchCity(cityInputVal);
  };


function searchCity(city, state, country, units) {
    var myKey = '32f5f1296c8b541458176503242fec0c';
    var cityState = state;
    var cityCountry = country;
    var chosenUnits = "&units=" + units;
    /*
    if (!chosenUnits) {
        return;
    }
    if (!cityState) {
        return;
    }
    if (!cityCountry) {
        return;
    } */

    var openWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}';

  openWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + myKey+ "&units=imperial";

  fetch(openWeatherUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      console.log(response);
      return response.json();
    })

    .then(function (data) {
      console.log(data);
       
        for (let i = 0; i < 5; i++) { 
            
        var block = document.createElement("div");
        block.innerHTML = "<h3>City: " 
                        + data.city.name 
                        + "</h3><br><p>Date: " 
                        + data.list[i].dt_txt
                        + "</p><br><p>Weather: " +data.list[i].weather[0].main +"/"+ data.list[i].weather[0].description[0].toUpperCase() + data.list[i].weather[0].description.slice(1) + "</p><p>Temperature: " 
                        + data.list[i].main.temp + " degrees "
                        + "</p><br><p>Humidity: " 
                        + data.list[i].main.humidity +"%"
                        + "</p><br><p>Wind Speed: "
                        + data.list[i].wind.speed + " mph";
            console.log(data.list[i])
        searchResults.appendChild(block);
      
    }
})
    .catch(function (error) {
      console.error(error);
    });
};






