export const mapService = {
    gLocations,
    initService
}


var gLocations = [
    {id, name, lat, lng, weather, createdAt, updatedAt}
];

function initService(){
    getLatLangFromStr(str)
}

function getLatLangFromStr(str){
    // here goes the geo-api-code  
    // Nehoray
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${str}&key=AIzaSyCkBmq94RUL-VNdku46pXE3nt-_Z01Damo`)
    .then(res => {
        console.log(res.data);
        return res.data
    })
    return Promise.resolve({lat,lang})
}