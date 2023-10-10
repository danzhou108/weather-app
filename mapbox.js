request = require('request');

const getGeo = (address,callback) => {
    const secret_mapbox = 'pk.eyJ1IjoiZGFuemhvdTEwOCIsImEiOiJjbGg2cDN4cHkwMWtwM2Zxc292Y2wzNHMyIn0.R8sp-u7FkTaWjl-RMooQDw';
    const baseURL_mapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json';
    const url_mapbox = baseURL_mapbox+'?limit=1&access_token='+secret_mapbox;
    request.get({url:url_mapbox},(error,response) => {
        const {features} = JSON.parse(response.body);
        if (error) {
            callback('Could not connect');
        } else if (features.length===0) {
            callback('Try another search param');
        } else {
            callback(undefined,[features[0].geometry.coordinates[0],features[0].geometry.coordinates[1]]);
        };
    });
};

module.exports = getGeo;