// default parameter
function multiply(a, b) {
    b = typeof b !== "undefined" ? b : 1; // manually checking if b is undefined
    return a * b;
}
let value = multiply(5); // here b is undefined by default
console.log(value); // 5

function multiply(a, b = 1) {
    return a * b; // manual checking is not needed here, as b is already set to 1 by default
}
console.log(multiply(5)); // 5

function multiply(a, b = 1) {
    return a * b; 
}
console.log(multiply(5, 2)); // 10

function check(a=1, b) {
    console.log(a, b, arguments); 
}
check(undefined, 2); // 1 2 


// Rest parameter - The rest parameter syntax allows us to represent an indefinite number of arguments as an array.
function multiply_Using_Rest_Param(multiplier, ...theArgs) {
    console.log(theArgs);
    return theArgs.map((x) => multiplier * x);
}
const arr = multiply_Using_Rest_Param(2, 1, 2, 3, 5);
console.log(arr); // [2, 4, 6]
  
  
