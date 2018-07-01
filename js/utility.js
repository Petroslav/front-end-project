var getWeatherIcon = function (weatherID, isDay) {
    var weatherIcon = 'wi ';

    switch (weatherID[0]) {
        case '2':
            if (isDay) {
                weatherIcon += 'wi-day-thunderstorm';
            } else {
                weatherIcon += 'wi-night-alt-thunderstorm';
            }
            break;

        case '3':
            if (isDay) {
                weatherIcon += 'wi-day-showers';
            } else {
                weatherIcon += 'wi-night-alt-showers';
            }
            break;

        case '5':
            if (isDay) {
                weatherIcon += 'wi-day-rain';
            } else {
                weatherIcon += 'wi-night-alt-rain';
            }
            break;

        case '6':
            if (isDay) {
                weatherIcon += 'wi-day-snow';
            } else {
                weatherIcon += 'wi-night-alt-snow';
            }
            break;

        case '7':

            if (isDay) {
                weatherIcon += 'wi-day-fog';
            } else {
                weatherIcon += 'wi-night-fog';
            }
            break;

        case '8':
            if (weatherID[2] === '0') {

                if (isDay) {
                    weatherIcon += 'wi-day-sunny';
                } else {
                    weatherIcon += 'wi-night-clear';
                }
            } else {

                if (isDay) {
                    weatherIcon += 'wi-day-cloudy';
                } else {
                    weatherIcon += 'wi-night-alt-cloudy';
                }
            }

    }

    return weatherIcon;
}

var weatherReport = function (weatherID) {
    var report = '';
    switch (weatherID) {
        case '200':
            report = 'Thunderstorm, light rain';
            break;
        case '201':
            report = 'Thunderstorm, rain';
            break;
        case '202':
            report = 'Thunderstorm, heavy rain';
            break;
        case '210':
            report = 'Light thunderstorm';
            break;
        case '211':
            report = 'Thunderstorm';
            break;
        case '212':
            report = 'Heavy thunderstorm';
            break;
        case '221':
            report = 'Ragged thunderstorm';
            break;
        case '230':
            report = 'Thunderstorm,light drizzle';
            break;
        case '231':
            report = 'Thunderstorm,drizzle';
            break;
        case '232':
            report = 'Thunderstorm, heavy drizzle';
            break;

        case '300':
            report = 'Light intensity drizzle';
            break;
        case '301':
            report = 'Drizzle';
            break;
        case '302':
            report = 'Intense drizzle';
            break;
        case '310':
            report = 'Light intensity drizzle rain';
            break;
        case '311':
            report = 'Drizzle rain';
            break;
        case '312':
            report = 'Intense drizzle rain';
            break;
        case '313':
            report = 'Shower rain and drizzle';
            break;
        case '314':
            report = 'Heavy shower';
            break;
        case '321':
            report = 'Shower drizzle';
            break;

        case '500':
            report = 'Light rain';
            break;
        case '501':
            report = 'Moderate rain';
            break;
        case '502':
            report = 'Intense rain';
            break;
        case '503':
            report = 'Very heavy rain';
            break;
        case '504':
            report = 'Extreme rain';
            break;
        case '511':
            report = 'Freezing rain';
            break;
        case '520':
            report = 'Light intensity shower rain';
            break;
        case '521':
            report = 'Shower rain';
            break;
        case '522':
            report = 'Intense shower rain';
            break;
        case '531':
            report = 'Ragged shower rain';
            break;

        case '600':
            report = 'Light snow';
            break;
        case '601':
            report = 'Snow';
            break;
        case '602':
            report = 'Heavy snow';
            break;
        case '611':
            report = 'Sleet';
            break;
        case '612':
            report = 'Shower sleet';
            break;
        case '615':
            report = 'Light rain and snow';
            break;
        case '616':
            report = 'Rain and snow';
            break;
        case '620':
            report = 'Light shower snow';
            break;
        case '621':
            report = 'Shower snow';
            break;
        case '622':
            report = 'Heavy shower snow';
            break;

        case '701':
            report = 'Mist';
            break;
        case '711':
            report = 'Smoke';
            break;
        case '721':
            report = 'Haze';
            break;
        case '731':
            report = 'Sand, dust whirls';
            break;
        case '741':
            report = 'Fog';
            break;
        case '751':
            report = 'Sand';
            break;
        case '761':
            report = 'Dust';
            break;
        case '762':
            report = 'Volcanic ash';
            break;
        case '771':
            report = 'Squalls';
            break;
        case '781':
            report = 'Tornado';
            break;

        case '800':
            report = 'Clear sky';
            break;
        case '801':
            report = 'Few clouds';
            break;
        case '802':
            report = 'Scattered clouds';
            break;
        case '803':
            report = 'Broken clouds';
            break;
        case '804':
            report = 'Overcast clouds';
            break;
    }

    return report;
}

var isDay = function (hours, sunrise, sunset) {
    var hour = hours.substring(0, 2);
    var mins = hours.substring(3);
    var sunriseHr = sunrise.substring(0, 2);
    var sunriseMin = sunrise.substring(3);
    var sunsetHr = sunset.substring(0, 2);
    var sunsetMin = sunset.substring(3);

    if (+hour === +sunriseHr) {
        if (+mins >= +sunriseMin) {
            return true;
        } else {
            return false;
        }
    }
    if (+hour === +sunsetHr) {
        if (+mins < +sunsetMin) {
            return true;

        } else {
            return false;
        }
    }
    if (+hour > +sunriseHr && +hour < +sunsetHr) {
        return true;
    } else {
        return false;
    }
}

var getWindIcon = function (windDeg) {
    var startClass = 'wi ';
    var endClass = ' wind-dir';
    if ((windDeg >= 0 && windDeg < 45) || windDeg == Math.floor(360)) {
        return startClass + 'wi-direction-down' + endClass;
    }
    if (windDeg >= 45 && windDeg < 90) {
        return startClass + 'wi-direction-down-left' + endClass;
    }
    if (windDeg >= 90 && windDeg < 135) {
        return startClass + 'wi-direction-left' + endClass;
    }
    if (windDeg >= 135 && windDeg < 180) {
        return startClass + 'wi-direction-up-left' + endClass;
    }
    if (windDeg >= 180 && windDeg < 225) {
        return startClass + 'wi-direction-up' + endClass;
    }
    if (windDeg >= 225 && windDeg < 270) {
        return startClass + 'wi-direction-up-right' + endClass;
    }
    if (windDeg >= 270 && windDeg < 315) {
        return startClass + 'wi-direction-right' + endClass;
    }
    if (windDeg >= 315 && windDeg <= 360) {
        return startClass + 'wi-direction-down-right' + endClass;
    }
}

var getLocalTime = function (offset) {
    var time = new Date().getTime();
    time = +time - (3 * 60 * 60 * 1000);
    time = +time + +offset * 1000;
    var date = new Date(time);
    var hours = "0" + date.getHours();
    var minutes = "0" + date.getMinutes();

    return hours.substr(-2) + ':' + minutes.substr(-2);
}

var getLocalDate = function(offset){
    offset = (+offset - (3 * 60 * 60))*1000;
    var timestamp = new Date().getTime() + +offset;
    return new Date(timestamp);;
}

var convertTime = function (timestamp, offset) {
    var time = +timestamp + +offset - (3 * 60 * 60);
    var date = new Date(time * 1000);
    var hours = "0" + date.getHours();
    var minutes = "0" + date.getMinutes();

    return hours.substr(-2) + ':' + minutes.substr(-2);
}

var stringDate = function (date) {
    var day = date.getDate();
    var month = +date.getMonth() + +1;
    var year = date.getFullYear();

    if (+month < 10) {
        month = '0' + month;
    }
    return day + '.' + month + '.' + year;
}

var shortStringDate = function(date) {
    var day = date.getDate();
    var month = +date.getMonth() + +1;

    if (+month < 10) {
        month = '0' + month;
    }
    return day + '.' + month;

}

var compareDates = function(date1, date2){
    if(date1.getMonth() === 12 && date2.getMonth() === 1){
        return true;
    }
    if(date1.getMonth() == date2.getMonth()){
        if(date2.getDate() > date1.getDate()){
            return true;
        }
    }else{
        if(date1.getMonth() < date2.getMonth()){
            return true;
        }
    }
    return false;
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}