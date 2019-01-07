class Greetings {
    english() { return 'Hello'; }
    spanish() { return 'Hola'; }
}

class MoreGreetings {
    german() { return 'Hallo'; }
    french() { return 'Bonjour'; }
}

const greetings = new Greetings();

const moreGreetings = new MoreGreetings(); 

const allGreetings = new Proxy(moreGreetings, {
    get: function(target, property){
        return target[property] || greetings[property]
    }
});

console.log(allGreetings.english());
console.log(allGreetings.spanish());
console.log(allGreetings.german());
console.log(allGreetings.french());



function logAccessToProperties(obj) {
    return new Proxy(obj, {
        get(target, key) {
            console.log(`Accessed key ${key}`);
            return Reflect.get(target, key); 
        },
        set(target, key, value) {
            console.log(`Updated key ${key} to ${value}`); 
            Reflect.set(target, key, value); 
        }
    });
}

const person = {
    name: 'Nathan',
    age: 32,
};

const personWithAccessLogging = logAccessToProperties(person);

personWithAccessLogging.age;
personWithAccessLogging.age = 33; 