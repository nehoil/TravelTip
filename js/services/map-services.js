import { utilService } from './util-service.js'



export const mapService = {
    gLocations,
    initService,
    getLatLangFromStr,
    addMarker,
    addLocation,
    getLocations,
    getAddressFromLatLng,
    deleteLocation,
    getLocation,
    getMarkerIdx,
    removeMarker


}


var gLocations = [];
var gMarkers = [];



function initService() {}

function getAddressFromLatLng(latlng) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng.lat},${latlng.lng}&key=AIzaSyCkBmq94RUL-VNdku46pXE3nt-_Z01Damo`)
        .then(res => {
            var loc = res.data.results[0]
            var locDetails = {
                address: loc.formatted_address,
                lat: loc.geometry.location.lat,
                lng: loc.geometry.location.lng,
            }
            return Promise.resolve(locDetails);
        })
}

function getLatLangFromStr(str) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${str}&key=AIzaSyCkBmq94RUL-VNdku46pXE3nt-_Z01Damo`)
        .then(res => {
            var loc = res.data.results[0]
            var locDetails = {
                address: loc.formatted_address,
                lat: loc.geometry.location.lat,
                lng: loc.geometry.location.lng,
            }
            return Promise.resolve(locDetails);
        })
}

function addMarker(marker) {
    gMarkers.push(marker);
}

function addLocation(locDetails) {
    var newLocation = { id: utilService.makeId(), name: locDetails.address, coords: { lat: locDetails.lat, lng: locDetails.lng } };
    gLocations.push(newLocation);
}

function getLocations() {
    return gLocations;
}

function deleteLocation(locIdx) {
    gLocations.splice(locIdx, 1);
}

function getLocation(locIdx) {
    return gLocations[locIdx]
}

function removeMarker(markerIdx) {
    gMarkers[markerIdx].setMap(null);
    gMarkers.splice(markerIdx, 1);
}

function getMarkerIdx(title) {
    var markerIdx = gMarkers.findIndex((marker) => {
        return marker.title === title;
    })
    return markerIdx;
}