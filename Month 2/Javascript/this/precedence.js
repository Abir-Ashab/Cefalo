// bind vs call
function greet() {
    console.log("Hello from:", this.name);
}

const boundGreet = greet.bind({ name: "Bound" }); // With the bind() method, an object can borrow a method from another object. Here we bind the greet function to an object with name "Bound".

console.log("Bound:");
boundGreet(); // Bound – bind() takes precedence

console.log("Bound + call() (trying to override bind):"); // They can both be used to call an object method with another object as argument.
boundGreet.call({ name: "Call" }); // Bound – bind() cannot be overridden by call() due to lower precedence

// bind vs object method
function talk() {
    console.log(this.name);
}
  
const user = {
    name: "User",
    talk: talk.bind({ name: "Bound" })
};  
user.talk(); // User – bind() takes precedence over object method
  

const globalName = "Global";
var name = globalName; // for browsers where `this` refers to global object

const obj = {
    name: "Object",
    greet: greet
};

console.log("Direct call with call():");
greet.call({ name: "Call" }); // Call – call() sets `this`

console.log("Object method:");
obj.greet(); // Object – called via obj

console.log("Global scope:");
greet(); // Global – falls back to global object in non-strict mode
