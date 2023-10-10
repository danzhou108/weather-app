request = require('request');

const getTemp = (x,y,callback) => {
    const secret_darksky = '9ea85520bc013c93e7a142aff90eb189';
    const baseURL_darksky = 'http://api.weatherstack.com/';
    const url = baseURL_darksky+'current?access_key='+secret_darksky+'&query='+x+','+y;
    request.get({url},(error,response) => {
        const {current} = JSON.parse(response.body);
        if (error) {
            callback('Could not connect');
        } else if (current.length===0) {
            callback(output);
        } else {
            callback(undefined,response.body);
        };
    });
};

module.exports = getTemp;