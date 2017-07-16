var cityInfo = {
	formatedName:"",
	longitude:"",
	latitude:""
}

var cities = [];

$( document ).ready(function() {


});

  //Google Places API Stuff

// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
 
 var placeSearch, autocomplete;

      function initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
            {types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete.addListener('place_changed', fillInAddress);

      }

      function fillInAddress() {
        // Get the place details from the autocomplete object.
        var place = autocomplete.getPlace();


        cityInfo.formatedName = place.formatted_address;
        cityInfo.latitude = place.geometry.location.lat();
        cityInfo.longitude= place.geometry.location.lng();



  

      }

      // Bias the autocomplete object to the user's geographical location,
      // as supplied by the browser's 'navigator.geolocation' object.
      function geolocate() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
          });
        }
      }



// Function to retreive weather from OpenWeather

    function retrieveWeather(){

   	var units;
   	var unit_symbol;
   	
   	if (document.getElementById('toggle').checked) {
   		units = "imperial";
   		unit_symbol = String.fromCharCode(0x2109);
   	}
   	else {
   		units= "metric";
   		unit_symbol = String.fromCharCode(0x2103);
   	}

    $.ajax( {
   	
    url: 'http://api.openweathermap.org/data/2.5/weather',
    dataType: "json",
    type: "GET",
    data: {
    	"lat": cityInfo.latitude,
    	"lon": cityInfo.longitude,
    	"APPID":"3edbd312592565005c5e1904745a5b91",
    	"units": units
    },

      success: function(data) { 
		

      	//get city name
      	var city = cityInfo.formatedName;
      	//take out USA if present
      	city = city.replace(", USA", "");

      	city = city.replace(/\d{5}/, "")



      	temp = Math.round(Number(data.main.temp));
      	temp = temp;


      	var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      	
      	cleaned_data = {
      		"city": city,
      		"temp": temp,
      		"icon": icon, 
      		"unit_symbol": unit_symbol
      	}

      	var template = $('#template').html();
  		Mustache.parse(template);   // optional, speeds up future uses
  		var rendered = Mustache.render(template, cleaned_data);
  		$('#target').append(rendered);

    },

});




}
