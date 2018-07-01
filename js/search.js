const GOOGLE_TIMEZONE_API_KEY = 'AIzaSyARiZ40ctMPljbZYSsAJWdKdVZASyzR_0o';
const WEATHER_API_KEY = 'e93a205840395d704e79315dc6ba7118';
const TIMEZONE_PART_1 = 'https://maps.googleapis.com/maps/api/timezone/json?location=';
const TIMEZONE_PART_2 = '&timestamp='
const TIMEZONE_PART_3 = '&key=';
const CURRENT_WEATHER_PART_1 = 'http://api.openweathermap.org/data/2.5/weather?q=';
const CURRENT_WEATHER_PART_2 = '&units=metric&APPID=';
const FIVE_DAY_WEATHER_PART_1 = 0;
const FIVE_DAY_WEATHER_PART_2 = 0;
var offset;

$(document).ready(function () {
    $('.search-btn').on('click', function () {
        var city = $('.search-bar').val();
        $('.search-bar').val('');
        //  if(city === ''){
        //     return;
        // }
        $.ajax({
            url: CURRENT_WEATHER_PART_1 + city + CURRENT_WEATHER_PART_2 + WEATHER_API_KEY,
            type: 'GET',
            dataType: 'jsonp',
            success: function (data) {
                display(data);
            },
        });
    });
});

var display = function (data) {

    //coords
    var lon = data.coord.lon;
    var lat = data.coord.lat;

    var timestamp = Math.floor(new Date().getTime() / 1000);
    var url = TIMEZONE_PART_1 + lat + ',' + lon + TIMEZONE_PART_2 + timestamp + TIMEZONE_PART_3 + GOOGLE_TIMEZONE_API_KEY;
    
    offset = $.parseJSON($.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        async: false,
    }).responseText);
    offset = +offset.rawOffset + +offset.dstOffset;

    var weatherID = data.weather[0].id;
    var main = data.weather[0].main;

    var temp = data.main.temp;
    var tempMin = data.main.temp_min;
    var tempMax = data.main.temp_max;
    
    var pressure = data.main.pressure;

    var windSpeed = data.wind.speed;
    var windDir = data.wind.deg;

    var clouds = data.clouds.all;

    var cityName = data.name;
    var country = data.sys.country;
    var sunrise = data.sys.sunrise;
    var sunset = data.sys.sunset;

    populateLocation('#fragment-1', cityName, country);
    populateDescr('#fragment-1', main, weatherID, offset, sunrise, sunset);
    populateTemp('#fragment-1', temp, tempMin, tempMax);
    populatePressure('#fragment-1', pressure);
    populateWindSpeed('#fragment-1', windSpeed, windDir);
    populateClouds('#fragment-1', clouds);
    populateSunRise('#fragment-1', offset, sunrise, sunset);
    populateLocalTime('#fragment-1', offset);
}