# Understanding JavaScript Promises

JavaScript's `Promise` mimics natural human behavior — that a result will eventually come. It represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

## States of a Promise
A promise can be in one of three states:

1. **Pending** – Initial state, neither fulfilled nor rejected.
2. **Fulfilled** – The operation completed successfully.
3. **Rejected** – The operation failed.

## Why the Name "Promise"?
JavaScript's Promise mimics the natural human behavior: that a result will must come. The result will either be:
1. Fulfilled (you got what was promised), we will get it from .then (resolve handles this)
2. Rejected (the promise was broken), get it from catch. (reject handles this)

## Basic Promise Example
```js
const myPromise = new Promise((resolve) => {
  let result = "Hello, World!";
  resolve(result);
});

myPromise
  .then((result) => {
    console.log("Promise resolved with:", result);
  })
  .catch((error) => {
    console.error("Promise rejected with:", error);
  });
```

## Promise with setTimeout (Simulating Delay)
```js
const learnPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true; // Change this to false to test rejection
    if (success) {
      resolve("You understood Promises! 🎉");
    } else {
      reject("You got stuck 😓");
    }
  }, 2000);
});

console.log(learnPromise); // Logs: Promise { <pending> }

learnPromise
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
```

## Promise with `fetch` API (Real-World Example)
```js
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((data) => {
    console.log("Post:", data);
  })
  .catch((error) => {
    console.error("Error fetching:", error);
  });
```

## Summary
- A **Promise object** represents a future value.
- You can attach `.then()` for success and `.catch()` for error.
- Promises help avoid callback hell and make async code more readable.
- Real-world APIs like `fetch` use Promises extensively.


