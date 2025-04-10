# Strict Mode and Variable Declarations in JavaScript

JavaScript's strict mode enforces stricter parsing and error handling, improving performance and avoiding certain issues. In strict mode, undeclared variables will throw a `ReferenceError`.

## Enabling Strict Mode

Strict mode is enabled by adding `'use strict';` at the beginning of your JavaScript file.

```js
'use strict';  // Enable strict mode in JavaScript
```

### Correct Variable Declarations

You can declare variables using `let` in a single statement, separated by commas:

```js
let user = 'John', age = 25, message = 'Hello'; // correct
let user3 = 'Alice'; let age3 = 25; let message3 = 'Hello'; // correct
```

### Incorrect Declarations in Strict Mode

In strict mode, undeclared variables will result in a `ReferenceError`. The following code is valid **only in non-strict mode**:

```js
let user2 = 'Bob'; age2 = 254; message2 = 'Hello'; // correct in non-strict mode, but throws ReferenceError in strict mode
console.log(age2); // ReferenceError: age2 is not defined
```

### Syntax Error in Variable Declarations

This code will throw a syntax error because JavaScript does not allow multiple variable declarations in a single line without proper syntax (e.g., missing semicolons):

```js
// let a = 1 let b = 2 let c = 3; // This is not allowed in JS due to missing semicolons and line breaks
```
---

*Note*: Strict mode is a best practice to catch common coding mistakes, such as using undeclared variables or assigning values to read-only properties.
