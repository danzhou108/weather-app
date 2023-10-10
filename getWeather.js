const mapbox = require('./mapbox');
const darksky = require('./darksky');

// const getLoc = process.argv[2];

// if (!getLoc) {
//     process.exit();
// };

const theWeather = (getLoc,callback) => {
    mapbox(getLoc,(error,response) => {
        if (error) {
            console.log(error);
            callback(error);
        } else if (response) {
            darksky(response[1],response[0],(error,response) => {
                if (error) {
                    console.log(error);
                    callback(error);
                } else if (response);
                    const {location:getLoc,current:getCurrent} = JSON.parse(response);
                    const {name:getCity,region:getState,country:getCountry} = getLoc;
                    const {temperature:getTemp} = getCurrent
                    console.log(getCity+', '+getState+', '+getCountry);
                    console.log('The temperature is currently '+getTemp+' degrees');
                    callback(undefined,getTemp);
            });
        };
    });

}

module.exports = theWeather;