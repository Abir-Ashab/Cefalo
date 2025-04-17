// this Alone
let x = this
console.log(x); // Outputs: Window object in browsers or global object in Node.js

// this in functions (same as this alone)
function myFunction() {
  return this;
}
console.log(myFunction()); // Outputs: Window object in browsers or global object in Node.js

// this is an object
const person = {
    firstName: "John",
    lastName : "Doe",
    id       : 5566,
    fullName : function() {
      return this.firstName + " " + this.lastName;
    }
};
console.log(person.fullName()); // Outputs: John Doe


let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  console.log(this.name );
}

// use the same function in two objects
user.f = sayHi;
admin.f = sayHi;

// these calls have different this
// "this" inside the function is the object "before the dot"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)
  
// this in arrow functions
let user2 = {
    firstName: "Ilya",
    sayHi() {
      const firstName = "Biliya";
      let arrow = () => console.log(this.firstName); // That’s a special feature of arrow functions, it’s useful when we actually do not want to have a separate this, but rather to take it from the outer context.
      arrow();
    }
};

user2.sayHi(); // Ilya