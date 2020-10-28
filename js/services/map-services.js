import { utilService } from './util-service.js'



export const mapService = {
    gLocations,
    initService,
    getLatLangFromStr,
    addMarker,
    addLocation,
    getLocations
}


var gLocations = [
    // {id, name, lat, lng, weather, createdAt, updatedAt}
];
var gMarkers = [];



function initService() {}

function getLatLangFromStr(str) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${str}&key=AIzaSyCkBmq94RUL-VNdku46pXE3nt-_Z01Damo`)
        .then(res => {
            console.log(res.data);
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
    console.log(gLocations);

    var newLocation = { id: utilService.makeId(), name: locDetails.address, coords: { lat: locDetails.lat, lng: locDetails.lng } };
    gLocations.push(newLocation);
}

function getLocations() {
    return gLocations;
}