'use-strict';

import { mapService } from './services/map-services.js'

// var gDefaultLoc = 'Central Park, New York';

window.onload = () => {
    document.querySelector('.go-btn').addEventListener('click', (ev) => {
        ev.preventDefault();
        var searchTerm = document.querySelector('.search-input').value
        onSearch(searchTerm)
    })
    document.querySelector('.my-location-btn').addEventListener('click', (ev) => {
        ev.preventDefault();
        onUserLocation();
    })
    onSearch('telaviv');
    mapService.initService();
    initMap();
}

var gMap;


function initMap() {
    gMap = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
    gMap.addListener("click", (mapsMouseEvent) => {
        var pos = JSON.stringify(mapsMouseEvent.latLng, null, 2);
        var latLng = JSON.parse(pos);
        mapService.getAddressFromLatLng(latLng)
            .then((locDetails) => {
                addLocation(locDetails);
                renderLoc(locDetails);
                renderLocations();
            })
    })
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
                    map: gMap,
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
        .then(renderLocations)
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


function renderAddress(address) {
    document.querySelector('.curr-location-address').innerHTML = address;
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
        return `<tr><td>${loc.name}</td><td>${loc.coords.lat}</td><td>${loc.coords.lng}</td><td><button class="go-btn-${loc.id}">GO!</button></td><td><button class="del-btn-${loc.id}">X</button></td></tr>`
    });
    var elTable = document.querySelector('.locations-table');
    elTable.innerHTML = locations.join('');

}



function onGoToLoc(loc) {
    console.log(loc.target.className);



}

function onDeleteLoc(loc) {
    console.log(loc.target.className);

}