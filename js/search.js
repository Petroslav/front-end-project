const GOOGLE_TIMEZONE_API_KEY = 'AIzaSyARiZ40ctMPljbZYSsAJWdKdVZASyzR_0o';
const WEATHER_API_KEY = 'e93a205840395d704e79315dc6ba7118';

const TIMEZONE_PART_1 = 'https://maps.googleapis.com/maps/api/timezone/json?location=';
const TIMEZONE_PART_2 = '&timestamp='
const TIMEZONE_PART_3 = '&key=';

const CURRENT_WEATHER_PART_1 = 'http://api.openweathermap.org/data/2.5/weather?q=';
const CURRENT_WEATHER_PART_2 = '&units=metric&APPID=';

const FIVE_DAY_WEATHER_PART_1 = 'http://api.openweathermap.org/data/2.5/forecast?lat=';
const FIVE_DAY_WEATHER_PART_2 = '&lon=';
const FIVE_DAY_WEATHER_PART_3 = '&units=metric&mode=json&APPID='

var offset;
var date;

$(function () {
    $("#tabs").tabs();
});

$(document).ready(function () {
    $('.search-btn').on('click', function () {
        var city = $('.search-bar').val();
        if (city === '') {
            return;
        }
        $('.search-bar').val('');
        $.ajax({
            url: CURRENT_WEATHER_PART_1 + city + CURRENT_WEATHER_PART_2 + WEATHER_API_KEY,
            type: 'GET',
            dataType: 'jsonp',
            success: function (data) {
                populateToday(data);
            },
        });
    });
});

var populateToday = function (data) {

    //coords
    var lon = data.coord.lon;
    var lat = data.coord.lat;

    var timestamp = Math.floor(new Date().getTime() / 1000);
    var url = TIMEZONE_PART_1 + lat + ',' + lon + TIMEZONE_PART_2 + timestamp + TIMEZONE_PART_3 + GOOGLE_TIMEZONE_API_KEY;

    offset = JSON.parse($.ajax({
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

    for (var i = 2; i < 7; i++) {
        var tab = '.tabs-list .tab-' + i;
        var date = getLocalDate(offset)
        date = date.addDays(i - 1);
        date = shortStringDate(date);
        $(tab).html(date);
        var tabID = '#fragment-' + i;
        populateLocation(tabID, cityName, country);
        populateSunRise(tabID, offset, sunrise, sunset);
        populateLocalTime(tabID, offset);
    }

    var fiveDayURL = FIVE_DAY_WEATHER_PART_1 + lat + FIVE_DAY_WEATHER_PART_2 + lon + FIVE_DAY_WEATHER_PART_3 + WEATHER_API_KEY;
    $.ajax({
        url: fiveDayURL,
        type: 'GET',
        dataType: 'jsonp',
        success: function (response) {
            populateDays(response, sunrise, sunset);
        },
    });
}

var populateDays = function (responseData, sunrise, sunset) {
    var curTab = 1;
    var tab = '#fragment-'
    var curLi = 1;
    var first = true;
    var curDate = getLocalDate(offset);
    for(var i = 0; i < responseData.list.length; i++){
        var info = responseData.list[i];
        var hourDate = new Date((+info.dt * 1000) + (+offset * 1000));

        if(compareDates(curDate, hourDate)){
            curDate = hourDate;
            curTab += 1;
            curLi = 1;
            first = true;
        }
        var time = convertTime(info.dt, offset);
        var tabz = tab+curTab + ' .list-picker';
        newLi = $
        $(tabz)
        .append('<li class=li-' + curLi + '> ' + time + ' </li>');
        var targetTab = tab + curTab;
        var liTab = targetTab + ' .li-' + curLi;
        populateHour(targetTab, liTab, info, sunrise, sunset, first);
        first = false;
        curLi += 1;
    }
}

var populateHour = function(tab, liTab, info, sunrise, sunset, first){

    var main = info.weather[0].main;
    var weatherID = info.weather[0].id;
    var temp = info.main.temp;
    var tempMin = info.main.temp_min;
    var tempMax = info.main.temp_max;
    var pressure = info.main.pressure;
    var clouds = info.clouds.all;
    var windSpeed = info.wind.speed;
    var windDir = info.wind.deg;

    $(liTab).on('click', function() {
        populateDescr(tab, main, weatherID, offset, sunrise, sunset);
        populateTemp(tab, temp, tempMin, tempMax);
        populatePressure(tab, pressure);
        populateWindSpeed(tab, windSpeed, windDir);
        populateClouds(tab, clouds);
    });

    if(first){
        populateDescr(tab, main, weatherID, offset, sunrise, sunset);
        populateTemp(tab, temp, tempMin, tempMax);
        populatePressure(tab, pressure);
        populateWindSpeed(tab, windSpeed, windDir);
        populateClouds(tab, clouds);
    }
}