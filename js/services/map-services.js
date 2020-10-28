export const mapService = {
    gLocations,
    initService
}


var gLocations = [
    // {id, name, lat, lng, weather, createdAt, updatedAt}
];

function initService(){
}

function getLatLangFromStr(str){
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