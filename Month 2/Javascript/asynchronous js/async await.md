# Understanding `async` and `await` in JavaScript

`async` and `await` are modern JavaScript features introduced in ES2017 (ES8) that simplify working with Promises. They make asynchronous code look and behave more like synchronous code, improving readability and maintainability.

## What is `async`?
- The `async` keyword is used to declare a function as asynchronous.
- An `async` function **always returns a Promise**, even if you return a non-promise value.
- Inside an `async` function, you can use the `await` keyword.

### Syntax:
```js
async function myFunction() {
  return "Hello"; // returns a resolved Promise
}

myFunction().then(console.log); // Output: Hello
```

## What is `await`?
- The `await` keyword can only be used inside `async` functions.
- It **pauses** the execution of the `async` function until the Promise is resolved.
- It returns the resolved value of the Promise.

### Example with `await`: 

Here result will always give me the resolved value, otherwise it will give me the pending value, but it will not give me the rejected value. Beause await ensures that.
```js
async function fetchMessage() {
  let promise = new Promise((resolve) => {
    setTimeout(() => resolve("Message received after 2 seconds!"), 2000);
  });

  let result = await promise; // Waits until the promise resolves
  console.log(result); // Output after 2 seconds
}

fetchMessage();
```

## Error Handling with `async/await`
- Use `try...catch` blocks for error handling.

```js
async function fetchWithErrorHandling() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts/1"); // fetch by default returns a promise, so we don't need to use new Promise here.
    let data = await response.json(); // response.json() is async and returns a Promise — so I need to await it to get the data. 
    console.log("Data using async/await:", data);
  } catch (error) {
    console.error("Failed to fetch:", error);
  }
}
fetchWithErrorHandling();
```

I could use `.then` in the above instead of await, as follows:
```js
response.json()
  .then ((data) => {
    console.log("Data using async/await:", data);
  })
  .catch((error) => {
    console.error("Failed to fetch:", error);
  });
```

## Why Use `async/await` Instead of `.then()`?
- Cleaner and easier to read, especially when chaining multiple asynchronous calls.
- Better for error handling with `try...catch`.
- Avoids "callback hell" and deeply nested `.then()` chains.

## Combining `async/await` with Array Methods
If you're using `await` inside loops, it's often better to use `for...of` instead of `.forEach()`.

```js
const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3"
];

async function fetchMultiplePosts() {
  for (let url of urls) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  }
}

fetchMultiplePosts();
```

### **Async/Await Version of `Promise.all()`**
```js
async function fetchMultiplePosts() {
  try {
    // Start both fetches in parallel
    const p1 = fetch("https://jsonplaceholder.typicode.com/posts/1");
    const p2 = fetch("https://jsonplaceholder.typicode.com/posts/2");

    // Wait for both to resolve
    const [res1, res2] = await Promise.all([p1, p2]);

    // Convert both responses to JSON
    const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

    // Use the data
    console.log("Post 1:", data1);
    console.log("Post 2:", data2);
  } catch (error) {
    console.error("One or more fetches failed:", error);
  }
}

fetchMultiplePosts();
```


## Summary
- `async` functions return a Promise.
- `await` waits for a Promise to resolve.
- Use `async/await` for cleaner, more readable asynchronous code.
- Handle errors using `try...catch`.
- Use `for...of` instead of `.forEach()` for async loops.

Async/await makes your asynchronous logic feel synchronous — making it easier to understand and debug.

