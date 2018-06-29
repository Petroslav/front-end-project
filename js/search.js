$(document).ready(function () {
    $('.search-btn').on('click', function () {
        var city = $('.search-bar').val();
        //  if(city === ''){
        //     return;
        // }
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&APPID=e93a205840395d704e79315dc6ba7118',
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
    var main = data.weather[0].main;
    var descr = data.weather[0].description;

    var temp = data.main.temp;
    var pressure = data.main.pressure;
    var humidity = data.main.humitidty;
    var tempMin = data.main.temp_min;
    var tempMax = data.main.temp_max;

    var windSpeed = data.wind.speed;
    var windDir = data.wind.deg;

    var clouds = data.clouds.all;

    var country = data.sys.country;
    var sunrise = data.sys.sunrise;
    var sunset = data.sys.sunset;
    var cityName = data.name;

    console.log(main);
    console.log(descr);
    console.log(temp);
    console.log(pressure);
    console.log(humidity);
    console.log(tempMin);
    console.log(tempMax);
    console.log(windSpeed);
    console.log(windDir);
    console.log(clouds);
    console.log(country);
    console.log(sunrise);
    console.log(sunset);
    console.log(cityName);
}

var mainStructure = function () {
    $('.search').setCss('display: none');
};