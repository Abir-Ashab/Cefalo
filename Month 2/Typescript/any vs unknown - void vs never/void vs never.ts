// void is a type that represents the absence of a value. It is often used as the return type for functions that do not return a value. The function returns `undefined` by default, and its type is `void`. 
function logMessage(message: string): void {
    console.log(message);
    return // optional
}

console.log(logMessage("Hello, TypeScript!")); // Output: undefined

function log(message: string): void {
    console.log(message);
    return undefined// optional
}

// Sometimes it can return null.
function logMessageWithNull(message: string): void {
    console.log(message);
    return null; // This is valid, but the function is still of type void
}
console.log(logMessageWithNull("Hello, TypeScript!")); // Output: undefined


// never is a special type in TypeScript that represents values that never occur. It is often used for functions that throw errors or have infinite loops. The function never returns a value, and its type is `never`.
function throwError(message: string): never {
    throw new Error(message);
    // return; // This line is unreachable and will never be executed
}
function infiniteLoop(): never {
    while (true) {}
}
// A function returning 'never' cannot have a reachable end point.
// function test(message: string): never {
//     console.log(message);
// }