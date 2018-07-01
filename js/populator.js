var populateLocation = function (tab, cityName, country) {
    $tab = $(tab + ' .city-country');
    $tab.html(cityName + ', ' + country);

    $tab = $(tab + ' .date');
    var date = new Date();
    var num = tab[tab.length - 1];
    if (+num > 1) {

        date.addDays(+num - 2);
    }
    $tab.html(stringDate(date))
}

var populateDescr = function (tab, main, weatherID, offset, sunrise, sunset) {
    var time = getLocalTime(offset);
    sunrise = convertTime(sunrise, offset);
    sunset = convertTime(sunset, offset);
    var day = isDay(time, sunrise, sunset);
    var icon = getWeatherIcon(weatherID.toString(), day);
    var description = weatherReport(weatherID.toString());
    $tab = $(tab + ' .short-descr');
    $tab.html(main);
    $tab = $(tab + ' .long-descr')
    $tab.html(description);
    $tab = $(tab + ' .icon-1 i');
    $tab.removeClass().addClass(icon);
};
var populateTemp = function (tab, temp, minTemp, maxTemp) {
    $tab = $(tab + ' .cur-temp');
    $tab.html(temp + '°C');
    $tab = $(tab + ' .header-temps')
    $tab.html(minTemp + '°C - ' + maxTemp + '°C');
}

var populatePressure = function (tab, pressure) {
    $tab = $(tab + ' .pressure-current');
    $tab.html(pressure + 'hPa');
}

var populateWindSpeed = function (tab, windSpeed, windDir) {
    $tab = $(tab + ' .wind-speed');
    $tab.html(windSpeed + ' m/s');
    $tab = $(tab + ' .wind-dir');
    var icon = getWindIcon(windDir);
    $tab.removeClass().addClass(icon);
}

var populateClouds = function (tab, clouds) {
    $tab = $(tab + ' .cloudiness');
    $tab.html('Cloudiness: ' + clouds + '%');
}

var populateSunRise = function (tab, offset, sunrise, sunset) {
    sunrise = convertTime(sunrise, offset);
    sunset = convertTime(sunset, offset);
    $tab = $(tab + ' .rise')
    $tab.html(sunrise);
    $tab = $(tab + ' .set')
    $tab.html(sunset);
}

var populateLocalTime = function (tab, offset) {
    var time = getLocalTime(offset);
    $tab = $(tab + ' .time')
    $tab.html(time);
}