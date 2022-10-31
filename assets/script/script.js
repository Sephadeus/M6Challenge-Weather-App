const searchBtn = document.getElementById("searchBtn");
const searchInputEl = document.querySelector('#search-input');
const previousSearchesEl = document.getElementById("previousSearches");
const monthKey = {
  01: "January",
  02: "February",
  03: "March",
  04: "April",
  05: "May",
  06: "June",
  07: "July",
  08: "August",
  09: "September",
  10: "October",
  11: "November",
  12: "December"
}


var openWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}';

const searchResults = document.getElementById("search-results");
searchBtn.addEventListener("click", citySearch);


function citySearch(event) {
    event.preventDefault();
    let cityInputVal = searchInputEl.value;

    searchResults.innerHTML = ""; 

    if (!cityInputVal) {
      console.error('You need a search input value!');
      alert('You need a search input value!');
      return;
    } 

  searchCity(cityInputVal);
  
};

var searchedFor = localStorage.getItem("cities");
var savedCities = searchedFor.split(",");

for (let i = savedCities.length - 1; i > savedCities.length - 6; i--) {
  var listItem = document
  .createElement("li");

  listItem.className = "listItem";
  listItem.setAttribute("id", savedCities[i]);
  listItem.textContent = savedCities[i];
  previousSearchesEl.appendChild(listItem);
  listItem.style.cursor = 'grab';
  listItem.addEventListener("click", function(event){
    event.preventDefault();
    searchCity(event.target.id);
    
  })

}


console.log(savedCities);

function searchCity(city, units) {
    console.log(city)
    savedCities.push(city);
    localStorage.setItem("cities", savedCities);

    console.log(localStorage.getItem("cities"))

    var myKey = '32f5f1296c8b541458176503242fec0c';
    //var cityState = state;
    //var cityCountry = country;
    var chosenUnits = "&units=" + units;

    if (!chosenUnits) {
        return;
    }
  
  openWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city +  '&appid=' + myKey+ "&units=imperial";

  fetch(openWeatherUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      } else {
      console.log(response);
      return response.json();
    }
  })
    .then(function (data) {
      console.log(data);

      searchResults.innerHTML = "<h2>5 Day Weather Forecast for " + city + "</h2>";
       
        for (let i = 0; i < data.list.length; i+=8) { 
        let iconURL = 'http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon +'@2x.png'
        var block = document.createElement("div");
        var info = document.createElement("div");
        var icon = document.createElement("img");
        var dateText = data.list[i].dt_txt;
        console.log(dateText.length);
        var monthDay = "";
        var year = "";
        for (let i = 0; i < dateText.length - 9; i++) {
          if (i < 4) {
            year += dateText[i];
          }
          if (i > 4) {
          if(dateText[i] == "-") {
            monthDay += " ";
          } else {
          monthDay += dateText[i];
        }
      }
      }

      monthName = monthKey[monthDay[0]+monthDay[1]];
      var dayDate = monthDay[2] + monthDay[3] + monthDay[4];
        console.log(monthName);
        console.log(dayDate);
        console.log(year);

        console.log(monthDay)
        console.log(dateText);
        icon.className = "icon";
        block.className = "block";
        info.className = "info"
        block.style.display = 'flex';
        info.innerHTML = "<p>Date: " 
                        + monthName + dayDate + ", " + year
                        + "</p><p>Weather: " 
                        + data.list[i].weather[0].main + "/"
                        + data.list[i].weather[0].description[0].toUpperCase() 
                        + data.list[i].weather[0].description.slice(1) 
                        + "</p><p>Temperature: " 
                        + data.list[i].main.temp_max + "/" + data.list[i].main.temp_min + " degrees "
                        + "</p><p>Humidity: " 
                        + data.list[i].main.humidity +"%"
                        + "</p><p>Wind Speed: "
                        + data.list[i].wind.speed + " mph";
            console.log(data.list[i])
        icon.setAttribute("src", iconURL);
        searchResults.appendChild(block);
        block.appendChild(info);
        block.appendChild(icon);
    }
})
    .catch(function (error) {
      console.error(error);
    }); 

};



