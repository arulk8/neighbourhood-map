
var map;
var markers = [];

var locations = [
          {title: 'Madras High Court', location: {lat: 13.087191, lng: 80.286434 }},
          {title: 'Indian Institute Of Logistics', location: {lat: 13.085971, lng: 80.284127 }},
          {title: 'Reserve Bank of India', location: {lat: 13.084453, lng: 80.288579 }},
          {title: 'TNPSC', location: {lat: 13.085247, lng: 80.282035 }},
	      {title: 'TAMIL NADU GOVERNMENT DENTAL COLLEGE', location: {lat: 13.084975, lng: 80.282604}},         
	      {title: 'Southern Railway Divisional Office', location: {lat:13.08254 , lng:80.277357 }}
];
function initMap() {


   map = new google.maps.Map(document.getElementById('map'), {
   center:{lat: 13.083741, lng: 80.282537} ,
   zoom: 15

  });
    var largeInfowindow = new google.maps.InfoWindow();
     var bounds = new google.maps.LatLngBounds();

for (var i=0;i<locations.length; i++)
{
	var position= locations[i].location;
	var title =locations[i].title;

	var marker =new google.maps.Marker(
		{
		map: map,
		position: position,
		title: title,
		animation: google.maps.Animation.Drop,
		id:i 
	});
	markers.push(marker); 

	marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
        });

	
	bounds.extend(markers[i].position);
}

map.fitBounds(bounds);

}


 function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker(null);
          });
        }
      }