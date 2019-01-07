var callbackAdd = (a, b, callback) => {
    // simulated delay
    setTimeout(() => {
        if (typeof a === 'number' && typeof b === 'number') {
            callback(null, a + b); 
        } else { 
            callback(new Error('Arguments must be numbers')); 
        }
    }, 1500);
};

var promiseAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        // simulated delay
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b); 
            } else { 
                reject('Arguments must be numbers'); 
            }
        }, 1500);
    }); 
}; 

callbackAdd(5, 5, (error, result) => {
    if(error) {
        console.log('Error 1: ', error)
    } else {
        console.log('Result 1: ', result);
        callbackAdd(result, 10, (error, result) => {
           if(error) {
               console.log('Error 2: ', error)
           } else {
               console.log('Result 2: ', result);
           }
        });
    }
});

promiseAdd(5, 'e').then((resolved) => {
    console.log('Resolution 1: ', resolved);
    return promiseAdd(resolved, 10);  
}).then((resolved) => {
    console.log('Resolution 2: ', resolved);
}, (rejected) => {
    console.log('Rejected 2', rejected); 
}).catch((error) => {
console.log('Error: ', error);
}); 

var asyncAdd = async (a,b) => {
    try {
        const sum = await promiseAdd(a,b);
        console.log('Sum 1: ', sum); 
        const sum2 = await promiseAdd(sum, 10);
        console.log('Sum 2: ', sum2); 
    } catch(e) {
        console.log(e); 
    }
}

asyncAdd(5,5); 

const util = require('util');
const promisifyAdd = util.promisify(callbackAdd);

promisifyAdd(5,5).then((resolved) => {
    console.log('Resolved: ', resolved); 
}).catch((error) => {
    console.log(error); 
}); 