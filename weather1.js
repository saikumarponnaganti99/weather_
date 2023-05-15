let weatherTextEl = document.getElementById("weatherText");
let searchIconEl = document.getElementById("searchIcon");

let citySpanEl = document.getElementById("citySpan");
let cityTemparatureEl = document.getElementById("cityTemparature");
let feelsLikeSpanEl = document.getElementById("feelsLikeSpan");

let errorrmsgEl = document.getElementById("errorrmsg");
// clear cloud
let cloudsClearImageEl = document.getElementById("cloudsClearImage");
// rain
let cloudsRainImageEl = document.getElementById("cloudsRainImage");
// haze
let cloudsHazeImageEl = document.getElementById("cloudsHazeImage");
// ful cloud
let cloudsImageEl = document.getElementById("cloudsImage");
//cloud-sun
let cloudssunImageEl = document.getElementById("cloudssunImage");

// cloud name
let cloudDescriptionEl = document.getElementById("cloudDescription");


// Humidity



let cityName = "Hyderabad";
createAndAppend(cityName);

function convertToCelsius(kelvin) {
    let Celsius = kelvin - 273.15;
    Celsius = parseInt(Celsius);
    return Celsius;
}


function createAndAppend(city) {
    let cityName = city;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=93f26e3c57081a6210de53b8dcfdfea4";
    let options = {
        method: "GET",
    };
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsondata) {
            console.log(jsondata);
            console.log(jsondata.cod);
            if (jsondata.cod == 404) {
                errorrmsgEl.textContent = jsondata.message + " or Make sure that first letter should be capital";
            } else {
                // city name
                citySpanEl.textContent = jsondata.name;

                //Feels like
                let feelsLikeInKelvin = jsondata.main.feels_like;
                let feelsLikeInCelsius = convertToCelsius(feelsLikeInKelvin);
                feelsLikeSpanEl.textContent = feelsLikeInCelsius + " ˚C";

                // Temparature
                let tempInKelvin = jsondata.main.temp;
                let tempInCelsius = convertToCelsius(tempInKelvin);
                cityTemparatureEl.textContent = tempInCelsius + " ˚C";

                // cloud HTMLImage
                let cloudFromJson = jsondata.weather[0].main;
                if (cloudFromJson === "Haze") {
                    cloudsHazeImageEl.classList.remove("d-none");
                    cloudsClearImageEl.classList.add("d-none");
                    cloudsRainImageEl.classList.add("d-none");
                    cloudsImageEl.classList.add("d-none");
                    cloudssunImageEl.classList.add("d-none");
                } else if (cloudFromJson === "Clear") {
                    cloudsClearImageEl.classList.remove("d-none");
                    cloudsRainImageEl.classList.add("d-none");
                    cloudsImageEl.classList.add("d-none");
                    cloudssunImageEl.classList.add("d-none");
                    cloudsHazeImageEl.classList.add("d-none");
                } else if (cloudFromJson === "Rain") {
                    cloudsRainImageEl.classList.remove("d-none");
                    cloudsImageEl.classList.add("d-none");
                    cloudssunImageEl.classList.add("d-none");
                    cloudsHazeImageEl.classList.add("d-none");
                    cloudsClearImageEl.classList.add("d-none");
                } else if (cloudFromJson === "Clouds") {
                    cloudsImageEl.classList.remove("d-none");
                    cloudssunImageEl.classList.add("d-none");
                    cloudsHazeImageEl.classList.add("d-none");
                    cloudsClearImageEl.classList.add("d-none");
                    cloudsRainImageEl.classList.add("d-none");
                } else {
                    cloudssunImageEl.classList.remove("d-none");
                    cloudsHazeImageEl.classList.add("d-none");
                    cloudsClearImageEl.classList.add("d-none");
                    cloudsRainImageEl.classList.add("d-none");
                    cloudsImageEl.classList.add("d-none");
                }
                // cloud name
                let cloudName = jsondata.weather[0].description;
                cloudDescriptionEl.textContent = cloudName;

                //humidity
                let humiditySpanEl = document.getElementById("humiditySpan");
                let humidityJson = jsondata.main.humidity;
                humiditySpanEl.textContent = humidityJson + "%";

                // wind
                let windSpanEl = document.getElementById("windSpan");
                let windJson = jsondata.wind.speed;
                windSpanEl.textContent = windJson + "Km/h";

                // Pressure
                let pressureSpanEl = document.getElementById("pressureSpan");
                let pressureJson = jsondata.main.pressure;
                pressureSpanEl.textContent = pressureJson;

                //visibility
                let visibilitySpanEl = document.getElementById("visibilitySpan");
                let visibilityJson = jsondata.visibility;
                let visibilityInKm = visibilityJson / 1000;
                visibilityInKm = parseInt(visibilityInKm);
                visibilitySpanEl.textContent = visibilityInKm + " Kms";
            }
        });
}






weatherTextEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        if (event.target.value === "") {
            errorrmsgEl.textContent = "Enter City name";
        } else {
            let city = event.target.value;
            errorrmsgEl.textContent = "";
            createAndAppend(city);
        }
    }
})

searchIconEl.addEventListener("click", function(event) {
    if (weatherTextEl.value === "") {
        errorrmsgEl.textContent = "Enter City name";
    } else {
        let city = weatherTextEl.value;
        errorrmsgEl.textContent = "";
        createAndAppend(city);
    }
})