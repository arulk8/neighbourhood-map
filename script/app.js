
var initiallocations = [
           {
            title: 'Coffee Central',
            id: '4d04ab309d33a1435992bc78',
            location: {
            lat: 13.0471675,
            lng: 80.1752437 }
             },
            {
            title: 'The Brew Room', 
            id: '548861de498e71cde07c9189',
            location: {
            lat: 13.045515, 
            lng: 80.261054
                  }
             },
            {
            title: 'Cafe Coffee Day',
            id: '4be565577e2a76b06fc91c9b',
            location: {
            lat: 13.068443, 
            lng: 80.256960
             }
             },
            {
            title: 'Starbucks', 
            id: '55f99e33498e4ddd66a2210e',
            location: {
            lat: 13.029288, 
            lng: 80.248454 
             }
            },
	       {
           title: 'Crisp Cafe',
           id: '541447de498e60ee78c88c44',
           location: {
           lat: 13.064889, 
           lng: 80.239045
           }
           },         
	       {
          title: 'Costa Coffee',
          id: '514bd3e9e4b00821ff670cae',
           location: {
           lat: 13.069393,
           lng: 80.238123
            }
          },
          {
          title: 'Lloyds Tea House',
          id: '516fe170e4b0c56ebcb78cda',
           location: {
           lat: 13.050531,
           lng: 80.255894
           
            }
          }
];
var map;


 

var viewModel =function() { 

"use strict";
 var self = this;
 var infowindow = new google.maps.InfoWindow();
 self.markers=[];

 self.Locations =ko.observableArray(initiallocations);

 self.Locations().forEach(function(loc){

  var marker = new google.maps.Marker({
    position :loc.location,
    title :loc.title,
    map :map,
    animation: google.maps.Animation.Drop
  });

   loc.marker =marker;
   self.markers.push(marker);

 marker.addListener('click', function() {
            populateInfoWindow(loc.marker, infowindow);
          });
});
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
  };

 

  function initMap() {


   map = new google.maps.Map(document.getElementById('map'), {
   center:{lat: 13.057407,lng: 80.235583} ,
   zoom: 12

  });
   ko.applyBindings(new viewModel());
 }