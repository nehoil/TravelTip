'use-strict';

import { mapService } from './services/map-services.js'
getParameterByName('lat')
getParameterByName('lng')
    // var gDefaultLoc = 'Central Park, New York';
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('myParam');
    document.querySelector('.go-btn').addEventListener('click', (ev) => {
        ev.preventDefault();
        var searchTerm = document.querySelector('.search-input').value
        onSearch(searchTerm)
    })
    document.querySelector('.copy-btn').addEventListener('click', (ev) => {
        onCopyLoc()
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


function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    console.log(decodeURIComponent(results[2].replace(/\+/g, ' ')));
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
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

function onCopyLoc() {
    var input = document.createElement('textarea');
    var posStr = document.querySelector('.curr-location-address').innerText;
    var posLatLng = mapService.getLatLangFromStr(posStr)
        .then(loc => {
            input.innerHTML = `https://nehoil.github.io/TravelTip/?lat=${loc.lat}&lng=${loc.lng}`
            console.log(input.innerHTML);
            document.body.appendChild(input);
            input.select();
            var result = document.execCommand('copy');
            document.body.removeChild(input);
        })
        // document.body.appendChild(input);
        // input.select();
        // var result = document.execCommand('copy');
        // document.body.removeChild(input);
        // return result;
}

function onSearch(str) {
    mapService.getLatLangFromStr(str)
        .then(renderLoc)
        .then(addLocation)
        .then(renderLocations)
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
        return `<tr><td>${loc.name}</td><td>${loc.coords.lat}</td><td>${loc.coords.lng}</td><td><button data-id="go-btn-${loc.id}">GO!</button></td><td><button data-id="del-btn-${loc.id}" name="${loc.name}">X</button></td></tr>`
    });
    var elTable = document.querySelector('.locations-table');
    elTable.innerHTML = locations.join('');

}

document.querySelector('.locations-table').addEventListener('click', doAction);


function doAction(ev) {
    if (ev.target.nodeName !== 'BUTTON') return;
    if (ev.target.innerText === 'GO!') {
        var locIdx = mapService.getLocations().findIndex((loc) => {
            return `go-btn-${loc.id}` === ev.target.dataset.id
        })
        var loc = mapService.getLocation(locIdx);
        var locDetails = {
            lat: loc.coords.lat,
            lng: loc.coords.lng,
            address: loc.name
        }
        renderLoc(locDetails);
    }

    if (ev.target.innerText === 'X') {
        var locIdx = mapService.getLocations().findIndex((loc) => {
            return `del-btn-${loc.id}` === ev.target.dataset.id
        })

        mapService.deleteLocation(locIdx);

        var markerIdx = mapService.getMarkerIdx(ev.target.name)
        mapService.removeMarker(markerIdx)
        renderLocations();
    }
}