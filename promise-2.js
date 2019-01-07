const request = require('request');
const API_KEY = 'AIzaSyDAzRXjzVYEc77G5buqi7nXIcuUFSekxRk'
var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => { 
        var encodedAddress = encodeURIComponent(address);
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`,
            json: true
        }, ( error, response, body) => {
            // console.log(response); 
            if (error) {
                reject('Unable to connect to Google servers');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address');
            } else if (body.status === 'OVER_QUERY_LIMIT') {
                reject(body.error_message); 
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    lat: body.results[0].geometry.location.lat,
                    lng: body.results[0].geometry.location.lng
                });
            }
        });
    }); 
};

geocodeAddress('Winston Salem').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});