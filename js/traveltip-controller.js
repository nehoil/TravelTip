'use-strict';

import { mapService } from './services/map-services.js'

var gDefaultLoc = 'Central Park, New York';

window.onload = () => {
    document.querySelector('.go-btn').addEventListener('click', (ev) => {
        ev.preventDefault();
        var searchTerm = document.querySelector('.search-input').value
        onSearch(searchTerm)
    })
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
        .then(renderLocations)
}

function onLocClick(id) {
    console.log('hello');
}


function renderLoc(locDetails) {
    var lat = locDetails.lat;
    var lng = locDetails.lng;
    gMap.setCenter({ lat: lat, lng: lng });
    return Promise.resolve(locDetails)
}


function addLocation(locDetails) {
    const latLng = { lat: locDetails.lat, lng: locDetails.lng }
    var marker = new google.maps.Marker({
        position: latLng,
        map: gMap,
        title: locDetails.address
    });
    mapService.addMarker(marker);
    mapService.addLocation(locDetails);
}

function renderLocations() {
    var locations = mapService.getLocations().map((loc) => {
        return `<tr><td>${loc.id}</td><td>${loc.name}</td><td>${loc.coords.lat}</td><td>${loc.coords.lng}</td></tr>`
    });
    var elTable = document.querySelector('.locations-table');
    elTable.innerHTML = locations.join('');
    console.log(locations);
}