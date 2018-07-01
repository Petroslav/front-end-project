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
            if (weatherID[1] === '0') {

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

var weatherReport = function(weatherID) {
    var report = '';
    switch(weatherID){
        case '200' : report = 'Thunderstorm, light rain'; break;
        case '201' : report = 'Thunderstorm, rain'; break;
        case '202' : report = 'Thunderstorm, heavy rain'; break;
        case '210' : report = 'Light thunderstorm'; break;
        case '211' : report = 'Thunderstorm'; break;
        case '212' : report = 'Heavy thunderstorm'; break;
        case '221' : report = 'Ragged thunderstorm'; break;
        case '230' : report = 'Thunderstorm,light drizzle'; break;
        case '231' : report = 'Thunderstorm,drizzle'; break;
        case '232' : report = 'Thunderstorm, heavy drizzle'; break;
        
        case '300' : report = 'Light intensity drizzle'; break;
        case '301' : report = 'Drizzle'; break;
        case '302' : report = 'Intense drizzle'; break;
        case '310' : report = 'Light intensity drizzle rain'; break;
        case '311' : report = 'Drizzle rain'; break;
        case '312' : report = 'Intense drizzle rain'; break;
        case '313' : report = 'Shower rain and drizzle'; break;
        case '314' : report = 'Heavy shower'; break;
        case '321' : report = 'Shower drizzle'; break;
        
        case '500' : report = 'Light rain'; break;
        case '501' : report = 'Moderate rain'; break;
        case '502' : report = 'Intense rain'; break;
        case '503' : report = 'Very heavy rain'; break;
        case '504' : report = 'Extreme rain'; break;
        case '511' : report = 'Freezing rain'; break;
        case '520' : report = 'Light intensity shower rain'; break;
        case '521' : report = 'Shower rain'; break;
        case '522' : report = 'Intense shower rain'; break;
        case '531' : report = 'Ragged shower rain'; break;
        
        case '600' : report = 'Light snow'; break;
        case '601' : report = 'Snow'; break;
        case '602' : report = 'Heavy snow'; break;
        case '611' : report = 'Sleet'; break;
        case '612' : report = 'Shower sleet'; break;
        case '615' : report = 'Light rain and snow'; break;
        case '616' : report = 'Rain and snow'; break;
        case '620' : report = 'Light shower snow'; break;
        case '621' : report = 'Shower snow'; break;
        case '622' : report = 'Heavy shower snow'; break;
        
        case '701' : report = 'Mist'; break;
        case '711' : report = 'Smoke'; break;
        case '721' : report = 'Haze'; break;
        case '731' : report = 'Sand, dust whirls'; break;
        case '741' : report = 'Fog'; break;
        case '751' : report = 'Sand'; break;
        case '761' : report = 'Dust'; break;
        case '762' : report = 'Volcanic ash'; break;
        case '771' : report = 'Squalls'; break;
        case '781' : report = 'Tornado'; break;

        case '800' : report = 'Clear sky'; break;
        case '801' : report = 'Few clouds'; break;
        case '802' : report = 'Scattered clouds'; break;
        case '803' : report = 'Broken clouds'; break;
        case '804' : report = 'Overcast clouds'; break;
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

console.log('swag' + weatherReport('201'));