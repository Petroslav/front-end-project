const GOOGLE_TIMEZONE_API_KEY = 'AIzaSyARiZ40ctMPljbZYSsAJWdKdVZASyzR_0o';
const WEATHER_API_KEY = 'e93a205840395d704e79315dc6ba7118';
const TIMEZONE_PART_1 = 'https://maps.googleapis.com/maps/api/timezone/json?location=';
const TIMEZONE_PART_2 = '&timestamp=1331161200&key=';
//' + TIMESTAMP + '&key='

$(document).ready(function () {
    $('.search-btn').on('click', function () {
        var city = $('.search-bar').val();
        $('.search-bar').val('');
        //  if(city === ''){
        //     return;
        // }
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&APPID=' + WEATHER_API_KEY,
            type: 'GET',
            dataType: 'jsonp',
            success: function (data) {
                display(data);
            },
        });
    });
});

$('.wat').on('click', function () {
    alert('wtf');
    console.log('wtf');
});

function display(data) {

    var lon = data.coord.lon;
    var lat = data.coord.lat;
    var main = data.weather[0].main;
    var descr = data.weather[0].description;

    var temp = data.main.temp;
    var pressure = data.main.pressure;
    var humidity = data.main.humidity;
    var tempMin = data.main.temp_min;
    var tempMax = data.main.temp_max;

    var windSpeed = data.wind.speed;
    var windDir = data.wind.deg;

    var clouds = data.clouds.all;
    
    var time = data.dt;

    var country = data.sys.country;
    var sunrise = data.sys.sunrise;
    var sunset = data.sys.sunset;
    var cityName = data.name;
    
    $.ajax({
        url: TIMEZONE_PART_1 + lat + ',' + lon + TIMEZONE_PART_2 + GOOGLE_TIMEZONE_API_KEY,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            var offset = response.rawOffset;
            console.log(getLocalTime(offset));
        },
    });


    // populateLocation('fragment-1', cityName, country);
    // populateDescr(fragment-1, main, descr);
    // populateTemp(fragment-1, temp, tempMin, tempMax);
    // populatePressure(fragment-1, pressure);
    // populateWindSpeed(fragment-1, windSpeed);
    // populateClouds(fragment-1, clouds);
    // populateSunRise(fragment-1, sunrise, sunset);

    // console.log(main);
    // console.log(descr);
    // console.log(temp);
    // console.log(pressure);
    // console.log(humidity);
    // console.log(tempMin);
    // console.log(tempMax);
    // console.log(windSpeed);
    // console.log(windDir);
    // console.log(clouds);
    // console.log(country);
    console.log(sunrise);
    console.log(sunset);
    // console.log(cityName);
    // console.log(time);
}

var populateLocation = function(tab, cityName, country){
    var tabID = '#' + tab;
    $tab = $(tabID);
    $tab.$('#city-country').html(cityName + ', ' + country);
}
var populateDescr;
var populateTemp;
var populatePressure;
var populateWindSpeed;
var populateClouds;
var populateSunRise;

var getLocalTime = function(offset) {
    var time = new Date().getTime();
    console.log(time);
    time = +time - +2*60*60*1000;
    console.log(time);
    console.log(offset*1000);
    time = +time + +offset*1000;
    var date = new Date(time);
    var hours = "0" + date.getHours();
    var minutes = "0" + date.getMinutes();
 
    return hours.substr(-2) + ':' + minutes.substr(-2);
 }

 var convertTime = function(timestamp, offset) {
    var time = +timestamp + +offset - 2*60*60;
    var date = new Date(time*1000);
    var hours = "0" + date.getHours();
    var minutes = "0" + date.getMinutes();
 
    return hours.substr(-2) + ':' + minutes.substr(-2);
 }