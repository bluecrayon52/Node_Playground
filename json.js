
// var obj = { 
//     name: 'Nathan'
// };

// var stringObj = JSON.stringify(obj);
// console.log(typeof stringObj); 
// console.log(stringObj); 

// var personString = '{ "name": "Nathan", "age": 32 }';
// var person = JSON.parse(personString);
// console.log( typeof person); 
// console.log(person); 

const fs = require('fs'); 

var origionalNote = { 
    title: 'Some Title',
    body: 'Some body'
}; 

var origionalNoteString = JSON.stringify(origionalNote);

fs.writeFileSync('notes.json', origionalNoteString); 

var noteString = fs.readFileSync('notes.json'); 

var note = JSON.parse(noteString);

console.log(typeof note); 
console.log(note.title); 

