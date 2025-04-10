'use strict';  // Enable strict mode in JavaScript
let user = 'John', age = 25, message = 'Hello'; // correct
let user3 = 'Alice'; let age3 = 25; let message3 = 'Hello'; // correct
let user2 = 'Bob'; age2 = 254; message2 = 'Hello'; // correct in non-strict mode, but through reference error in strict mode
console.log(age2); // ReferenceError: age2 is not defined

// let a = 1 let b = 2 let c = 3...This is not allowed in JS because it is not a valid syntax due to lack of semicolon and line breaks


// var user = 1; // incorrect
