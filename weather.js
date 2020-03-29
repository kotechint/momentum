const weather = document.querySelector(".js-weather");
const API_KEY = "9d6405b6065090cae9885395381054fc";
const COORDS = "coords";

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=37.778146299999996&lon=126.43673620000001&APPID=${API_KEY}&units=metric`
    ).then(function (response) {
        return response.json()
    }).then(function (json) {
        const temper = json.main.temp;
        const loca = json.name;
        weather.innerText = `${temper}°C @ ${loca}`;
    })
}

function saveCoodrs(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoodrs(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("can't acces geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude)
    }
}

function init() {
    loadCoords();
}

init();