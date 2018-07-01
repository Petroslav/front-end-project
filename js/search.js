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
    //short description
    var main = data.weather[0].main;
    //long description
    var descr = data.weather[0].description;

    var temp = data.main.temp;
    var pressure = data.main.pressure;
    var tempMin = data.main.temp_min;
    var tempMax = data.main.temp_max;

    var windSpeed = data.wind.speed;
    var windDir = data.wind.deg;

    var clouds = data.clouds.all;

    var cityName = data.name;
    var country = data.sys.country;
    var sunrise = data.sys.sunrise;
    var sunset = data.sys.sunset;

    populateLocation('fragment-1', cityName, country);
    // populateDescr('fragment-1', main, descr);
    // populateTemp(fragment-1, temp, tempMin, tempMax);
    // populatePressure(fragment-1, pressure);
    // populateWindSpeed(fragment-1, windSpeed);
    // populateClouds(fragment-1, clouds);
    // populateSunRise(fragment-1, sunrise, sunset);
}

var populateLocation = function (tab, cityName, country) {
    $tab = $('#' + tab + ' .city-country');
    $tab.html(cityName + ', ' + country);

    $tab = $('#' + tab + ' .date');
    var date = new Date();
    var num = tab[tab.length - 1];
    if (+num > 2) {

        date.addDays(+num - 2);
    }
    $tab.html(stringDate(date))
}

var populateDescr = function (tab, main, descr) {

    $tab = $('#' + tab + ' .')
};
var populateTemp;
var populatePressure;
var populateWindSpeed;
var populateClouds;
var populateSunRise;

var getLocalTime = function (offset) {
    var time = new Date().getTime();
    console.log(time);
    time = +time - (3 * 60 * 60 * 1000);
    console.log(time);
    console.log(offset * 1000);
    time = +time + +offset * 1000;
    var date = new Date(time);
    var hours = "0" + date.getHours();
    var minutes = "0" + date.getMinutes();

    return hours.substr(-2) + ':' + minutes.substr(-2);
}

var convertTime = function (timestamp, offset) {
    var time = +timestamp + +offset - (3 * 60 * 60);
    var date = new Date(time * 1000);
    var hours = "0" + date.getHours();
    var minutes = "0" + date.getMinutes();

    return hours.substr(-2) + ':' + minutes.substr(-2);
}

function stringDate(date) {
    var day = date.getDate();
    var month = +date.getMonth() + +1;
    var year = date.getFullYear();

    if (+month < 10) {
        month = '0' + month;
    }
    return day + '.' + month + '.' + year;
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}