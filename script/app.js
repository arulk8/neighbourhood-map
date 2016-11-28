
var initiallocations = [
           {
            title: 'Madras High Court', 
            location: {
            lat: 13.087191,
            lng: 80.286434 }
             },
            {
            title: 'Indian Institute Of Logistics', 
            location: {
            lat: 13.085971,
            lng: 80.284127 }
             },
            {
            title: 'Reserve Bank of India',
            location: {
            lat: 13.084453,
            lng: 80.288579 }
             },
            {
            title: 'TNPSC', 
            location: {
            lat: 13.085247, 
            lng: 80.282035 }
            },
	       {
           title: 'TAMIL NADU GOVERNMENT DENTAL COLLEGE',
           location: {
           lat: 13.084975,
           lng: 80.282604}
           },         
	       {
          title: 'Southern Railway Divisional Office',
           location: {
           lat:13.08254 , 
           lng:80.277357 }
          }
];
var map;



var viewModel =function() { 

"use strict";
 var self = this;

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
});


    };

 

  function initMap() {


   map = new google.maps.Map(document.getElementById('map'), {
   center:{lat: 13.083741, lng: 80.282537} ,
   zoom: 15

  });
   ko.applyBindings(new viewModel());
 }
