'use-strict';

import { mapService } from './services/map-services.js'

var gDefaultLoc = 'Central Park, New York';

window.onload = () => {
    mapService.initService()
    initMap()
        .then(renderLoc(gDefaultLoc))
}

var gMap;


function initMap() {
    gMap = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
    return Promise.resolve()
}


function onSearch() {

}

function onLocClick(id) {

}


function renderLoc(id) {

}

function onAddLoc() {

}

/////// MOVE TO SERVICE ///////

var gMarkers = [];

function addPlace(lat, lng, title) {
    var marker = new google.maps.Marker({
        position: {
            lat: lat,
            lng: lng
        },
        map,
        title: title
    });
    gMarkers.push(marker)

    var newPlace = { id: getNewId(), name: title, coords: { lat, lng } };
    gLocations.push(newPlace);
    renderPlaces();
}