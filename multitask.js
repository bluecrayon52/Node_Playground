// process.env.UV_THREADPOOL_SIZE = 5;
const https = require('https'); 
const crypto = require('crypto'); 
const fs = require('fs'); 
const start = Date.now(); 

function doRequest () {
    https.request('https://www.google.com', res => {
        res.on('data', () => {});
        res.on('end', () => {
            console.log('HTTPS:', Date.now() - start); 
        });
    }).end(); 
};

function doHash() {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log('Hash:', Date.now() - start); 
    });
}

// https uses underlying OS, not thread pool 
doRequest();

// Hard Drive accessed twice, thread in pool opens up while waiting
// switches threads in pool between 
fs.readFile('multitask.js', 'utf8', () => { 
    console.log('FS:', Date.now() - start); 
});

doHash(); 
doHash(); 
doHash(); 
doHash(); 
