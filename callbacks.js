var getUser = (id, callback) => {
    var user = {
        id: id, 
        name: 'Nathan'
    };

    // simulated delay
    setTimeout(()=>{
        callback(user);
    }, 3000);
};

getUser(32, (userObject) => {
    console.log(userObject);
});

