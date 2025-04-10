// JavaScript moves declarations (NOT initializations) to the top of their scope (function or global) before executing the code.

// var is hoisted and initialized as undefined
console.log(hoist); // Output: undefined
var hoist = 'The variable has been hoisted.'; 

// How the js compiler sees the above code
var hoist;
console.log(hoist); // Output: undefined
hoist = 'The variable has been hoisted.';


// let and const — hoisted, BUT not initialized. They are in the "Temporal Dead Zone" (TDZ) , you can’t access them before they are declared.
console.log(b); //  ReferenceError
let b = 10;

// Function Declarations — fully hoisted
greet(); // "Hello"
function greet() {
  console.log("Hello");
}


// Function Expressions — NOT fully hoisted
sayHi(); // TypeError: sayHi is not a function

var sayHi = function () {
  console.log("Hi");
};

// Not hoisted, similar to let and const
const obj = new Person(); // ReferenceError: Cannot access 'Person' before initialization
class Person {}
