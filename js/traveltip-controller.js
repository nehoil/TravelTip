'use-strict';

import { mapService } from './services/map-services.js'

var gDefaultLoc = 'Central Park, New York';

window.onload = () => {
    document.querySelector('.go-btn').addEventListener('click', (ev) => {
        ev.preventDefault();
        var searchTerm = document.querySelector('.search-input').value
        onSearch(searchTerm)
    })
    document.querySelector('.my-location-btn').addEventListener('click', (ev) => {
        ev.preventDefault();
        onUserLocation()
    })
    onSearch('telaviv')
    mapService.initService()
    initMap()
    // .then(renderLoc(gDefaultLoc))
}

var gMap;
var gMarkers = [];



function initMap() {
    gMap = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });

    return Promise.resolve()
}


function onUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            gMap.setCenter(pos);
            new google.maps.Marker({
                position: pos,
                map:gMap,
                title: 'My Location'
            });
            mapService.getAddressFromLatLng(pos)
            .then(renderLoc)
        },

            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }

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
    renderAddress(locDetails.address)
    var lat = locDetails.lat;
    var lng = locDetails.lng;
    gMap.setCenter({ lat: lat, lng: lng });
    return Promise.resolve(locDetails)
}


function renderAddress(address){
    document.querySelector('.curr-location-address').innerHTML = address;
}

function addLocation(locDetails) {
    const latLng = { lat: locDetails.lat, lng: locDetails.lng }
    var marker = new google.maps.Marker({
        position: latLng,
        gMap,
        title: locDetails.address
    });

    gMarkers.push(marker)

    var newLocation = { id: 100, name: locDetails.address, coords: { lat: locDetails.lat, lng: locDetails.lng } };
    // gLocations.push(newLocation);
}

function onAddLoc() {
    addLocation(locDetails)
}