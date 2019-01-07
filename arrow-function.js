var square = x => x * x;

var user = {
    name: 'Nathaniel',
    sayHello: () => {
        //global scope arguments, NO this binding 
        console.log(arguments); 
        console.log(`1) Hello. I'm ${this.name}`);
    },
    sayHelloAlt () {
        //arguments 1, 2, 3, this binding (this.name defined)
        console.log(arguments); 
        console.log(`2) Hello. I'm ${this.name}`);
    }
}; 
user.sayHello(1, 2, 3);
user.sayHelloAlt(1, 2, 3);


var pets1 = {
    names: ['Remi', 'Rue'],
    owner: 'Nathan',
    description: function() {
        return this.names.map((pet) => { 
            // this.owner is defined at top level
            return `${this.owner} parties with a party dog named ${pet}.`
        });

    }
}
console.log(pets1.description()); 

var pets2 = {
    names: ['Remi', 'Rue'],
    owner: 'Nathan',
    description: function() {
        return this.names.map(function (pet) { 
            // this.owner undefined in parent function
            return `${this.owner} parties with a party dog named ${pet}.`
        });

    }
}
console.log(pets2.description());