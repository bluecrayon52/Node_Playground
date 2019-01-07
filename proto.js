const _ = require('lodash');
/* ///////////////////////////////////////////////////////////////////
    Delegate Prototype (flywieghts for free, good for sharing methods) 
*/////////////////////////////////////////////////////////////////////

var proto = {
    //shorthand method definition 
    hello() {
        return 'Hello, my name is ' + this.name;
    }, 
    // function keyword
    goodbye: function() {
        return 'Goodbye ' + this.yourName; 
    }
};

var nathan = Object.create(proto);
// js has dynamic object extension
nathan.name = 'Nate Dog'; 

console.log(nathan.hello()); 

/*///////////////////////////////////////////////////////////
    Cloning/ Concatenation (greate for default state, mixins)
*////////////////////////////////////////////////////////////

// Pre ES6 using lodash
var heather = _.extend({}, proto, {name: 'Pepper Rabbit'}); 

console.log(heather.hello()); 

// Post ES6 using Object.assign(destination object, source objects...)
// for property name conflicts, the last object in wins
var remi = Object.assign({}, proto, {name: 'Humperdink', yourName: 'Nathaniel'}); 

console.log(remi.hello()); 
console.log(remi.goodbye());

var Events = {
    trigger(event, attr) {
        console.log(`${event}: ${attr.name} is now ${attr.value}`);
    }
}

// mixins for event emitters 
var foo = Object.assign({
    attrs: {}, 
    set(name, value) {
        // bracket notation used to pass a name var that resolves to a string
        this.attrs[name] = value;
        this.trigger('change', { name, value }); //property shorthand
    },
    get(name, value) {
        return this.attrs[name]; 
    }
}, Events);

foo.set('mood', 'Happy');

/*/////////////////////////////////////////////////////////////
    So called Functional Inheritance
    (not really a prototype or functional, 
       but great for encapsulation/ privacy, functional mixins)
*/////////////////////////////////////////////////////////////

var model = function() {
    var attrs = {}; // now private members (attrs cannot be accessed directly outside of object)

    // any function inside of closure has access to attrs (within closure)
    this.set = function(name, value) {
        attrs[name] = value;
        this.trigger('change', {name, value});
    };

    this.get = function(name, value) {
        return attrs[name];
    }
    Object.assign(this, Events); 
};

var xena = {};
model.call(xena);
xena.set('name', 'Warrior Princess');

/*///////////////////////////////////////////////////////////////
    Composition using concatenative inheritance with exemplar prototypes (copy from them)
*////////////////////////////////////////////////////////////////

const distortion = { distortionA: 1, distortionB: 2 };
const volume = { volumeA: 1, volumeB: 2};
const cabinet = { cabinet: 'maple' };
const lowCut = { lowCut: 1 };
const inputLevel = { inputLevel: 1 };

const GuitarAmp = (options) => {
  return Object.assign({}, {distortion: distortion.distortionB}, volume, cabinet, options);
};

const BassAmp = (options) => {
  return Object.assign({}, {volume: volume.volumeB, distortion: distortion.distortionA}, lowCut, cabinet, options);
};

const ChannelStrip = (options) => {
  return Object.assign({}, inputLevel, lowCut, volume, options);
};

gAmp = GuitarAmp({color: 'black'});

bAmp = BassAmp({color: 'red'});

console.log(gAmp);
console.log(bAmp);

/*///////////////////////////////////////////
Delegate prototype attached to object literal
*////////////////////////////////////////////

// delegate prototype 'mammal'
let mammal = {
    animal: 'mammal',
    random: 'testing',
    describe() {
        return `A ${this.animalType} with ${this.furColor} fur, ${this.legs} legs, and a ${this.tail} tail.`; 
    }
};

// object instance 'mouse'
// Object.assign(destination object, source objects...)
// Object.create(existing object) provides new object __proto__ (avoids constructors and 'new' keyword)
let mouse = Object.assign(Object.create(mammal), {
    animalType: 'mouse',
    furColor: 'brown',
    legs: 4,
    tail: 'long, skinny'
  });

// js runtime will look for describe in 'mammal' (the delegate)
console.log(mouse.describe());

/*///////////////////////////////////////////////////
  Factory Function Example (vs. constructor functions)
*/////////////////////////////////////////////////////
let mouseFactory = () => {
    return Object.assign(Object.create(mammal), {
        animalType: 'mouse',
        furColor: 'brown',
        legs: 4,
        tail: 'long, skinny'
    });
};

let mickey = mouseFactory();

console.log(mickey); 

/*///////////////////////////////////////////////////
    Class inheritance example 
*/////////////////////////////////////////////////////
class cat {
    constructor ({ furColor = 'black', legs = '4', tail='long, fuzzy' }) {
        Object.assign(this, {
            furColor, legs, tail, 
            meow() {
                return `meoooooow`; 
            },
            random: 'testing'
        });
    }
}

class tomCat extends cat {
    constructor (options = {}) {
        super(options);
        this.cuteness = options.cuteness;
    }
}

let tom = new tomCat({cuteness:'very', furColor:'Grey'});

console.log(tom); 

/*///////////////////////////////////////////////////
    Any function can create closure for data privacy 
*////////////////////////////////////////////////////
let horseFactory = () => {
    let secret = "shhhhhhhh..... I'm a magic unicorn";
    return Object.assign(Object.create(mammal), {
        animalType: 'horse',
        furColor: 'white',
        legs: 4,
        tail: 'long, flowing',
        whisper() {
            return secret;
        }
    });
};

let ed = horseFactory();

console.log(ed.tail); 
console.log(ed.secret); // undefined 
console.log(ed.whisper()); 

