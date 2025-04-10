
# JavaScript Hoisting Explanation

JavaScript moves **declarations** (NOT initializations) to the top of their scope (function or global) before executing the code.

## `var` and Hoisting

Variables declared using `var` are hoisted and initialized as `undefined`.

```js
// Example with var
console.log(hoist); // Output: undefined
var hoist = 'The variable has been hoisted.';
```

### How the JavaScript Compiler Sees This:

```js
// Behind the scenes
var hoist;
console.log(hoist); // Output: undefined
hoist = 'The variable has been hoisted.';
```

## `let` and `const` Hoisting

Both `let` and `const` are hoisted, but **not initialized**. They are in the **"Temporal Dead Zone" (TDZ)**, meaning you can't access them before they are declared.

```js
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 10;
```

## Function Declarations and Hoisting

Function declarations are **fully hoisted**, meaning you can call them before the actual declaration in your code.

```js
// Example with function declarations
greet(); // Output: "Hello"
function greet() {
  console.log("Hello");
}
```

## Function Expressions and Hoisting

Function expressions are **not fully hoisted**. You cannot call them before the declaration.

```js
// Example with function expressions
sayHi(); // TypeError: sayHi is not a function

var sayHi = function () {
  console.log("Hi");
};
```

## Class Declarations and Hoisting

Class declarations are also **not hoisted** in the same way as let and const declarations.

```js
// Example with class declarations
const obj = new Person(); // ReferenceError: Cannot access 'Person' before initialization
class Person {}
```

---
*Note*: Understanding hoisting is crucial for managing variable scopes, especially when working with `var`, `let`, `const`, and function declarations or expressions.