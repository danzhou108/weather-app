const request = require('request');
const fs = require('fs');

const secret_darksky = 'ac1b62b80fc0afe3707c8708d0179d05';
const secret_mapbox = 'pk.eyJ1IjoiZGFuemhvdTEwOCIsImEiOiJjbGg2cDN4cHkwMWtwM2Zxc292Y2wzNHMyIn0.R8sp-u7FkTaWjl-RMooQDw';
const baseURL_darksky = 'http://api.weatherstack.com/';
const baseURL_mapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/San Francisco.json'
const url_mapbox = baseURL_mapbox+'?limit=1&access_token='+secret_mapbox;

request.get({url:url_mapbox},(error,response) => {
    output = JSON.parse(response.body);
    if (error) {
        console.log('Could not connect')
    } else if (!output.features) {
        console.log('Try another search param');
    } else {
        console.log(output.features);
        fs.writeFileSync('/Users/danielzhou/Desktop/Tests/Playground/Node JS Tutorial/geo.json',response.body);
    }
})

const getDat = fs.readFileSync('./geo.json');
dat = JSON.parse(getDat);
let x = dat.features[0].geometry.coordinates[0];
let y = dat.features[0].geometry.coordinates[1];
const url_darksky = baseURL_darksky+'current?access_key='+secret_darksky+'&query='+y+','+x;

request({url:url_darksky,json:true},(error,response) => {
    console.log('Temperature is '+response.body.current.temperature,'Degrees Celcius');
})