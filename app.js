// https://api.open-meteo.com/v1/forecast?latitude=-34.94&longitude=-57.95&current_weather=true
var xmlHttp = new XMLHttpRequest();
var longitude = 0;
var latitude = 0;

window.onload = (event) =>
{
    $.ajax({
        url: "https://geolocation-db.com/jsonp",
        jsonpCallback: "callback",
        dataType: "jsonp",
        success: function( location ) {
            // $('#country').html(location.country_name);
            // $('#state').html(location.state);
            // $('#city').html(location.city);
            // $('#latitude').html(location.latitude);
            // $('#longitude').html(location.longitude);
            // $('#ip').html(location.IPv4); 

            //     navigator.geolocation.getCurrentPosition(()=>{});
            //     navigator.geolocation.getCurrentPosition((position) =>
            latitude = location.latitude;
            longitude = location.longitude;
            // console.log(latitude);
            // console.log(longitude);
            var url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
            xmlHttp.open( "GET", url, false );
            xmlHttp.send( null );
            var response = JSON.parse(xmlHttp.responseText);
            console.log(response);
            document.getElementById("temperature").innerHTML = response['current_weather']['temperature'] + "°C";
            if(response['current_weather']['weathercode'] == 0)
                document.getElementById("image-state").setAttribute("src", "https://ssl.gstatic.com/onebox/weather/256/sunny.png");
            if(response['current_weather']['weathercode'] == 1)
                document.getElementById("image-state").setAttribute("src", "https://ssl.gstatic.com/onebox/weather/256/sunny_s_cloudy.png");
            else if(response['current_weather']['weathercode'] > 1 &&  response['current_weather']['weathercode'] < 5)
                document.getElementById("image-state").setAttribute("src", "https://ssl.gstatic.com/onebox/weather/256/cloudy.png");
            else// (response['current_weather']['weathercode'] > 2)
                document.getElementById("image-state").setAttribute("src", "https://ssl.gstatic.com/onebox/weather/256/rain_light.png");
            

            document.getElementById('country-label').innerHTML = location.country_name; 
            document.getElementById('city-label').innerHTML = location.city; 
            console.log(location.country_name)
        }
    });	
};