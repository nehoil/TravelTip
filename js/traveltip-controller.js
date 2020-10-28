'use-strict';

import { mapService } from './services/map-services.js'

var gDefaultLoc = 'Central Park, New York';

window.onload = () => {
    onSearch('telaviv')
    mapService.initService()
    initMap()
        // .then(renderLoc(gDefaultLoc))


}

var gMap;


function initMap() {
    gMap = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
    return Promise.resolve()
}


function onSearch(str) {
    mapService.getLatLangFromStr(str)
        .then(renderLoc)
        .then(addLocation)
}

function onLocClick(id) {
    console.log('hello');

}


function renderLoc(locDetails) {
    var lat = locDetails.lat;
    var lng = locDetails.lng;
    gMap.setCenter({ lat: lat, lng: lng });
    return Promise.resolve(locDetails)
        // addNewPlace(lat, lng, 'You are here');
}

function onAddLoc() {

}

/////// MOVE TO SERVICE ///////

var gMarkers = [];



function addLocation(locDetails) {
    var marker = new google.maps.Marker({
        position: {
            lat: locDetails.lat,
            lng: locDetails.lng
        },
        map,
        title: locDetails.address
    });
    gMarkers.push(marker)

    var newLocation = { id: getNewId(), name: title, coords: { lat: locDetails.lat, lng: locDetails.lng } };
    gLocations.push(newPlace);
    // renderPlaces();
}