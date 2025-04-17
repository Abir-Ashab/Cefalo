# Error Handling with `try...catch` in JavaScript

JavaScript provides the `try...catch` construct to gracefully handle runtime errors and avoid crashes during code execution. Below is a comprehensive guide, with examples and best practices.

---

##  1. What Can `try...catch` Handle?

`try...catch` only works for **runtime errors**—errors that occur while executing **valid JavaScript syntax**. It can't catch **syntax errors**, which are caught at the parsing phase before execution.

###  Example (Syntax Error – Won’t Work)
```js
try {
  {{{{{{ // Invalid syntax
} catch (err) {
  console.log("Won't be caught - code has syntax errors.");
}
```

>  **Note:** If the code is not syntactically valid, it won't even run, so `try...catch` won't help.

---

##  2. Synchronous vs Asynchronous Errors

`try...catch` works only with synchronous code. If an exception happens in asynchronous code (e.g., inside `setTimeout`), it won't be caught unless the `try...catch` is inside that asynchronous block.

###  Error Inside `setTimeout` – Not Caught
```js
try {
  setTimeout(() => {
    nonExistentFunction(); // Error happens here
  }, 100);
} catch (err) {
  console.log("This won't catch the error");
}
```

###  Correct Usage – Catch Inside the Async Function
```js
setTimeout(() => {
  try {
    nonExistentFunction(); // Error happens here
  } catch (err) {
    console.log("Error caught inside setTimeout:", err.message);
  }
}, 100);
```

---

##  3. Understanding the Error Object

When an error is caught, JavaScript provides an object with details:

- `name`: Type of the error (e.g., ReferenceError)
- `message`: Description of the error
- `stack`: (Optional) Stack trace

###  Example
```js
try {
  undefinedVariable; // ReferenceError
} catch (err) {
  console.log("Name:", err.name);       // ReferenceError
  console.log("Message:", err.message); // undefinedVariable is not defined
  // console.log("Stack:", err.stack);  // Optional detailed trace
}
```

---

##  4. Handling JSON Parsing Errors

Parsing invalid JSON with `JSON.parse()` will throw a `SyntaxError`. Wrap such code in `try...catch`.

###  Invalid JSON Format
```js
const json = "{ bad json }";

try {
  const user = JSON.parse(json);
} catch (err) {
  console.log("JSON Error caught:", err.message);
}
```

###  Valid JSON, Incomplete Data
```js
const json = '{ "age": 30 }';

try {
  const user = JSON.parse(json);
  console.log("Name:", user.name); // undefined – no error
} catch (err) {
  console.log("Won't execute because there's no parsing error");
}
```

---

##  5. Throwing Custom Errors

Sometimes data may be valid JSON but not logically valid for your app. In that case, throw your own error.

###  Custom Validation
```js
const json = '{ "age": 30 }';

try {
  const user = JSON.parse(json);
  if (!user.name) {
    throw new SyntaxError("Incomplete data: no name");
  }
  console.log("User:", user.name);
} catch (err) {
  console.log(`Custom Error: ${err.message}`); // Incomplete data: no name
}
```

---

## 6. Checking Error Type with `instanceof`

You can identify specific types of errors using the `instanceof` operator.

###  Example
```js
try {
  someUndefinedFunction();
} catch (err) {
  if (err instanceof ReferenceError) {
    console.log("Caught a ReferenceError");
  } else {
    console.log("Some other error:", err);
  }
}
```

---

##  7. Rethrowing Errors

Sometimes, you may want to catch and handle **specific errors**, and rethrow others so that they can be handled elsewhere.

###  Rethrow Non-Handled Errors
```js
function readData() {
  try {
    someFunction(); // Could throw
  } catch (err) {
    if (err instanceof SyntaxError) {
      console.log("Handled SyntaxError inside readData");
    } else {
      throw err; // Rethrow other errors
    }
  }
}

try {
  readData();
} catch (err) {
  console.log("Caught externally:", err.message);
}
```

---

##  Summary Table

| Concept                     | Description                                                             |
|----------------------------|-------------------------------------------------------------------------|
| Runtime Errors              | Can be caught by `try...catch`                                         |
| Syntax Errors               | Must be fixed; can't be caught                                         |
| Async Errors                | Must wrap `try...catch` inside async functions                         |
| Error Object Properties     | `name`, `message`, `stack`                                             |
| JSON Parsing                | Catch invalid JSON, and validate fields                                |
| Custom Errors               | Use `throw` to raise custom issues                                     |
| `instanceof` Checks         | Detect error types and react accordingly                               |
| Rethrowing Errors           | Catch known errors and pass unknown ones up the stack                  |

---
