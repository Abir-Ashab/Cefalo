// TypeScript can infer types based on the value assigned to a variable. This means you don't always have to explicitly declare the type of a variable.
let x = 10
console.log(x); // Output: 10

let userName = "Alice"
console.log(userName); // Output: Alice

// type inference with function return type
function add(a: number, b: number) {
    return a + b; // TypeScript infers the return type as number
}
let type_is = typeof add(2, 3); 
console.log(type_is); // Output: number