// String Operators
// 1. Concatenation operator (+)
console.log("my " + "string"); // console logs the string "my string".


// Unary Operators
// 1. Delete 
delete object.property;
delete object[propertyKey];
delete objectName[index];

// 2. Typeof 
const myFun = new Function("5 + 2");
const shape = "round";
const size = 1;
const foo = ["Apple", "Mango", "Orange"];
const today = new Date();
typeof myFun; // returns "function"
typeof shape; // returns "string"
typeof size; // returns "number"
typeof foo; // returns "object"
typeof today; // returns "object"
typeof doesntExist; // returns "undefined"



// Relational operators
// 1. In
"PI" in Math; // returns true
const myString = new String("coral");
"length" in myString; // returns true
const myCar = { make: "Honda", model: "Accord", year: 1998 };
"make" in myCar; // returns true
"model" in myCar; // returns true

// 2. Instanceof
const myDate = new Date();
myDate instanceof Date; // returns true