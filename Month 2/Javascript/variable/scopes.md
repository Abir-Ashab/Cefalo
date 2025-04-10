# JavaScript Scopes: Global Scope, Function Scope, and Block Scope

JavaScript has three types of scopes that determine where variables can be accessed and modified:

- **Global Scope**
- **Function Scope**
- **Block Scope**

In JavaScript, the scope of a variable is the region of the program where it is defined and accessible.

## 1. Global Scope

A variable has **Global Scope** if it is declared outside any function or block. It can be accessed from anywhere within the JavaScript code, including functions and blocks.

```js
// Global Scope Example
let globalVar = 'I am a global variable';

function showGlobalVar() {
  console.log(globalVar); // Can access globalVar inside the function
}

showGlobalVar(); // Output: I am a global variable
console.log(globalVar); // Output: I am a global variable
```

In this example, the variable `globalVar` is declared in the global scope, making it accessible inside the `showGlobalVar()` function as well as outside of it.

## 2. Function Scope

A variable has **Function Scope** if it is declared inside a function. It can only be accessed within that function. Variables declared with `var`, `let`, or `const` within a function will be scoped to that function.

```js
// Function Scope Example
function functionScope() {
  var functionVar = 'I am scoped to the function';
  console.log(functionVar); // Can access functionVar inside the function
}

functionScope(); // Output: I am scoped to the function
console.log(functionVar); // ReferenceError: functionVar is not defined
```

In this example, `functionVar` is accessible only within the `functionScope()` function. Outside the function, it throws a `ReferenceError` because the variable is scoped to the function.

## 3. Block Scope

A **Block Scope** is defined by curly braces `{}`. Variables declared within a block (using `let` or `const`) are only accessible within that block. Variables declared with `var` inside a block are **not** scoped to the block; instead, they are scoped to the function, or global scope if declared outside of any function.

```js
// Block Scope Example
if (true) {
  let blockVar = 'I am scoped to the block';
  const blockConst = 'I am also scoped to the block';
  console.log(blockVar); // Output: I am scoped to the block
  console.log(blockConst); // Output: I am also scoped to the block
}

console.log(blockVar); // ReferenceError: blockVar is not defined
console.log(blockConst); // ReferenceError: blockConst is not defined
```

In this example, both `blockVar` and `blockConst` are accessible inside the `if` block but not outside it. Outside the block, trying to access these variables results in a `ReferenceError`.

### Example with `var` Inside Block (No Block Scope)

```js
// Block Scope with var Example
if (true) {
  var varInBlock = 'I am not scoped to the block';
}

console.log(varInBlock); // Output: I am not scoped to the block
```

In this case, the variable `varInBlock` is declared inside a block using `var`. However, `var` does not respect block scope, and the variable is accessible outside the block because it has **function scope** or **global scope**, depending on where it is declared.

---

### Summary of Scope Types:

- **Global Scope**: Accessible anywhere in the code.
- **Function Scope**: Accessible only within the function where it is declared.
- **Block Scope**: Accessible only within the block (using `let` or `const`).
