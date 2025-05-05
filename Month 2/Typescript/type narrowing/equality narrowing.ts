// write a function that adds two numbers
function addNumbers(a: number | string, b: number | string) {
    if (typeof a === "number" && typeof b === "number") {
        return a + b;
    } else {
        return a.toString() + b.toString();
    }
}
// call the function and log the result
console.log(addNumbers(2, 3)); // 5 
console.log(addNumbers(2, "3")); // 23 
