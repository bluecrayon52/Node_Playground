const https = require('https'); 

const start = Date.now(); 

function doRequest () {
https.request('https://www.google.com', res => {
    res.on('data', () => {});
    res.on('end', () => {
        console.log(Date.now() - start); 
    });
}).end(); 
};

// not managed by thread pool of libuv 
// delegated to OS, which handles multi-threading 
doRequest(); 
doRequest(); 
doRequest(); 
doRequest(); 
doRequest(); 
doRequest(); 
doRequest(); 