var initiallocations = [{
        title: 'Coffee Central',
        id: '4d04ab309d33a1435992bc78',
        location: {
                lat: 13.0471675,
                lng: 80.1752437
        }
}, {
        title: 'The Brew Room',
        id: '548861de498e71cde07c9189',
        location: {
                lat: 13.045515,
                lng: 80.261054
        }
}, {
        title: 'Cafe Coffee Day',
        id: '4be565577e2a76b06fc91c9b',
        location: {
                lat: 13.068443,
                lng: 80.256960
        }
}, {
        title: 'Starbucks',
        id: '55f99e33498e4ddd66a2210e',
        location: {
                lat: 13.029288,
                lng: 80.248454
        }
}, {
        title: 'Crisp Cafe',
        id: '541447de498e60ee78c88c44',
        location: {
                lat: 13.064889,
                lng: 80.239045
        }
}, {
        title: 'Costa Coffee',
        id: '514bd3e9e4b00821ff670cae',
        location: {
                lat: 13.069393,
                lng: 80.238123
        }
}, {
        title: 'Lloyds Tea House',
        id: '516fe170e4b0c56ebcb78cda',
        location: {
                lat: 13.050531,
                lng: 80.255894
        }
}];
var map;
var previousinfowindow;
var viewModel = function () {
        "use strict";
        var self = this;
        //the client id and client secret is taken from foursquare app login
        var CLIENT_ID = 'GFKCMKYBQ0UDTMIDE2HGMK2ENN5KWSPTMTF3XV3JHP1M0YJV';
        var CLIENT_SECRET = '10IJSVJFIDQYP0YAGHACE245UBT5AMWSXFZK3B0VSOX4FBCN';
        var contentString;
        // creating an observable array
        self.Locations = ko.observableArray(initiallocations);
        self.Locations().forEach(function (loc) {
                var marker = new google.maps.Marker({
                        position: loc.location,
                        title: loc.title,
                        map: map,
                        animation: google.maps.Animation.Drop
                });
                loc.marker = marker;
                var url = 'https://api.foursquare.com/v2/venues/' + loc.id + '?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&v=20161129&m=foursquare';
                $.ajax({
                        method: 'GET',
                        url: url,
                        dataType: 'jsonp',
                        success: function (data) {
                                var resp = data.response.venue;
                                var name = resp.name;
                                var url = resp.shortUrl;
                                var addr;
                                if (resp.location.address === undefined) {//if data is not found show this msg
                                        addr = "Sorry! The Address is Unavailable";
                                } else {
                                        addr = resp.location.address;
                                }// merging the seperated image url
                                var suffix = resp.bestPhoto.suffix;
                                var prefix = resp.bestPhoto.prefix;
                                var imgsrc = prefix + '100x150' + suffix;
                                contentString = '<h4>' + name + '<h4>' + '<p>' + addr + '<p>' + '<p><a href="' + url + '">Website<a><p>' + '<img src="' + imgsrc + '"/>';
                                getinfowindow(contentString);
                        },
                        error: function (data) {
                                contentString = "Content Failed to Load Try Again!!!";
                                getinfowindow(contentString);
                        }
                });
                var getinfowindow = function (content) {
                        //console.log(content);
                        var infowindow = new google.maps.InfoWindow({
                                content: content,
                                maxWidth: 100
                        });
                        loc.infowindow = infowindow;
                };
                loc.marker.addListener('click', function () {
                        if (previousinfowindow !== undefined) {// checks if infowindow is currently open
                                previousinfowindow.close();
                        }
                        previousinfowindow = loc.infowindow;
                        //console.log(previousinfowindow);
                        loc.infowindow.open(map, loc.marker);
                });
        });// To search and filter available list and Marker
        self.places = ko.observableArray(initiallocations);
        self.query = ko.observable('');
        //computed observable depends on other observables
        self.search = ko.computed(function () {//filter results using knockouts utils.arrayFilter
                return ko.utils.arrayFilter(self.places(), function (place) {
                        var input = place.title.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
                        // console.log(input);
                        if (input) {
                                place.marker.setVisible(true);//setVisible inbuilt property available in google map api
                        } else {
                                place.marker.setVisible(false);
                        }
                        return input;
                });
        });//To bounce the marker when the list is clicked
        self.placelist = function (val) {
                //console.log(val);
                map.panTo(val.location);
                val.marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function () {
                        val.marker.setAnimation(null);
                }, 2000);
                if (previousinfowindow !== undefined) {
                                previousinfowindow.close();
                        }
                        previousinfowindow = val.infowindow;
                        //console.log(previousinfowindow);
                        val.infowindow.open(map, val.marker);

        };
};

function GError() {
        $(".text").text("The Content Cannot be Loaded Sorry for Inconvenience");
}
// create an instance of map
function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
                center: {
                        lat: 13.057407,
                        lng: 80.235583
                },
                zoom: 12
        });
        ko.applyBindings(new viewModel());
}