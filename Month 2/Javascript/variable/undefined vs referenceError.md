## **Undefined**

`undefined` is a primitive value in JavaScript. A variable is assigned the value `undefined` under the following circumstances:

- When a variable is declared but not initialized (no value is assigned to it).
- When a function does not explicitly return a value (it returns `undefined` by default).
- When accessing an object property that doesn’t exist, the result will be `undefined`.

##### Example 1: Variable Declared But Not Initialized
```js
let a;
console.log(a);  // Output: undefined
```
In this case, the variable `a` is declared but not assigned any value, so its value is `undefined`.

##### Example 2: Function with No Return Value
```js
function greet() {
  // No return statement
}

let result = greet();
console.log(result);  // Output: undefined
```
Since the `greet()` function doesn't return anything, `result` gets the value `undefined`.

##### Example 3: Accessing a Non-Existent Object Property
```js
let person = { name: 'Alice' };
console.log(person.age);  // Output: undefined
```
Here, the property `age` does not exist on the `person` object, so accessing it results in `undefined`.

## **ReferenceError**

A `ReferenceError` occurs when you try to use a variable or function that has not been declared or defined in the current scope. This error is typically raised when:

- Trying to access a variable that has not been declared (i.e., the variable does not exist in the scope).
- Accessing a variable before it is declared when using `let` or `const` (due to the Temporal Dead Zone in JavaScript).

##### Example 1: Using an Undeclared Variable
```js
console.log(a);  // ReferenceError: a is not defined
```
In this case, the variable `a` has not been declared, so trying to access it results in a `ReferenceError`.

##### Example 2: Accessing a Variable Before Declaration with `let` or `const`
```js
console.log(b);  // ReferenceError: Cannot access 'b' before initialization
let b = 10;
```
Here, the variable `b` is hoisted but cannot be accessed before its declaration due to the **Temporal Dead Zone (TDZ)** in JavaScript.

##### Example 3: Accessing a Non-Existent Function
```js
foo();  // ReferenceError: foo is not defined
```
In this case, the function `foo()` has not been declared before it is called, resulting in a `ReferenceError`.

---

