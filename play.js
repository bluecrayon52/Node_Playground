/*////////////////////////////////
 forEach, filter, map, and reduce
*/////////////////////////////////

// var sample = [1, 2, 3];

// sample.forEach((elem, index) => console.log(`${elem} comes at ${index}`));

// var result = sample.filter(elem => elem !== 2); 

// console.log(result); 

// let mapped = sample.map(elem => elem * 10)

// console.log(mapped);

// var sum = sample.reduce((sum, elem) => sum + elem)

// console.log(sum)

/*/////////////////////////////
 let and var scope
*//////////////////////////////

// function ringOfFire() {
//     let name = 'June'; // scope defined for block and sub-blocks
//     var last = 'Carter'; 
//     if (true) {
//         let name = 'Johnny';
//         var last = 'Cash';
//         console.log(name); // overwritten for sub-block only
//         console.log(last); // overwritten for entire function 
//     }
//     console.log(name); // unchanged 
//     console.log(last); // changed
// }

// ringOfFire(); 

/*/////////////////////////////
 Early Binding vs Late Binding
*//////////////////////////////

// // Early Binding (compile time)
// var sum = function(a, b) {
//     console.log(`sum: a: ${a}, b: ${b}`);
//     return a + b;
//   };
  
//   var x = 5, y = 6;
//   var sumEarly = sum.bind(null, x, y);
  
//   x = 10;
//   y = 5;
//   console.log("with Early Binding -->", sumEarly());
  
//   // Late Binding (runtime)
//   var sum2 = function(p) {
//     console.log(`sum2: p.x: ${p.x}, p.y: ${p.y}`);
//     return p.x + p.y;
//   };
  
//   var x = 5, y = 6;
//   var n = {x, y};
//   var sumLate = sum2.bind(null, n);
  
//   n.x = 10;
//   n.y = 5;
  
//   console.log("Late Binding -->", sumLate());

/*///////////////////////////////////////////
 How to make Objects (Douglas Crockford 2015)
*////////////////////////////////////////////

function constructor2(spec) {
    // destructuring, same as 'let member = spec.member'
    let { member } = spec,
    { other } = other_constructor(spec), 
    method = function () {
        // access to member, other, method, spec
    };
    // immutable object
    return Object.freeze({
        method,
        other
    });
}

/*///////////////////////////////////////////
 Ice Factory Version (Bill Sourour 2018)
*////////////////////////////////////////////

function makeSomething({ member }) { // destructuring on spec 
    const { other } = makeSomethingElse();
    
    return Object.freeze({ 
      other,
      method // function hoisting (only for function statements, not expressions)
    }); 
    function method () {
      // code that uses "member"
    };
  }

/*///////////////////////////////////////////
 Practical Ice Factory and Object composition
*////////////////////////////////////////////

// function makeDogList({ doggyDb }) { 

//     return Object.freeze({
//       addDog,
//       setAllDogsFree,
//       getDog,
//       removeDog,
//     });

//    function addDog(dog) {
//         doggyDb.push(dog);
//    };

//    function setAllDogsFree() {
//         doggyDb =[];
//    };

//    function getDog(name) {
//         return doggyDb.find(dog => dog.name === name);
//    }; 

//    function removeDog(name) {
//         doggyDb = doggyDb.filter(dog => dog.name != name);
//    };

//   }

// function makeDogPound(dogList) {
//     // private member
//     const euthanize = ' is dead, but all dogs go to heaven!';

//     return Object.freeze({
//         dogs: dogList,
//         kill
//     });

//     function kill(dog) {
//         console.log(dog.name + euthanize);
//         dogList.removeDog(dog.name);
//     };
// }

//   const doggyDb = [];
//   const doggyList = makeDogList({ doggyDb });
//   const pound = makeDogPound(doggyList);

//   pound.dogs.addDog({

//   }); 
//   pound.dogs.addDog({
//       name: 'Boomer',
//       age: 3,
//       breed: 'Red Tick Hound',
//       vaccinated: false
//   }); 

//   pound.dogs.addDog({
//     name: 'Sammy',
//     age: 8,
//     breed: 'Basset Hound',
//     vaccinated: false
// }); 

// const sammy = pound.dogs.getDog('Sammy');
// const boomer = pound.dogs.getDog('Boomer');

// console.log(sammy);
// console.log(boomer);

// console.log(pound.euthanize); // undefined (private)

// pound.kill(boomer);

// console.log(pound.dogs.getDog('Boomer'));  // undefined (no more Boomer muahaha!)

/*/////////////////////////////////////////////
 Trampoline for large recursion (Kyle Simpson)
*//////////////////////////////////////////////

const trampoline = fn => (...args) => {
    let result = fn(...args)
    
    while (typeof result === 'function') {
      result = result()
    }
    
    return result
}

const sumBelowRec = (number, sum = 0) => (
number === 0
    ? sum
    : () => sumBelowRec(number - 1, sum + number)
)

const sumBelow = trampoline(sumBelowRec)
console.log(sumBelow(100000));
