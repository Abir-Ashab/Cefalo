### **Node.js Call Stack & Stack Trace Explained**

In **Node.js**, the **call stack** is a **data structure** that keeps track of the function calls in your program. It's based on the **Last-In-First-Out (LIFO)** principle — the last function called is the first to finish and get removed from the stack.

####  How it works:

When a function is called:

* It's **pushed** onto the stack.
* When it finishes executing, it's **popped** off.

If functions call other functions, the stack grows deeper.

#### Example:

```js
function greet() {
  console.log("Hello!");
}

function welcome() {
  greet(); // pushed to the stack
}

welcome(); // pushed to the stack
```

**Call Stack flow:**

```
1. call welcome() ➝ push 'welcome'
2. call greet()   ➝ push 'greet'
3. console.log()  ➝ push 'log'
4. log finishes   ➝ pop 'log'
5. greet finishes ➝ pop 'greet'
6. welcome finishes ➝ pop 'welcome'
```

---

### **What is a Stack Trace?**

A **stack trace** is a report of the **active call stack** at a specific point in time, usually when an error occurs. It helps you **trace back** where the error originated.

#### Example:

```js
function a() {
  b();
}

function b() {
  c();
}

function c() {
  throw new Error("Something went wrong");
}

a();
```

#### Output (Stack Trace):

```
Error: Something went wrong
    at c (/path/to/file.js:9:9)
    at b (/path/to/file.js:5:3)
    at a (/path/to/file.js:2:3)
    at Object.<anonymous> (/path/to/file.js:12:1)
```

### 🔍 How to Read a Stack Trace:

Each line shows:

* The **function name**
* The **file path**
* The **line and column number**

So in this case:

* `c()` threw the error.
* It was called by `b()`, which was called by `a()`.

---

### In Node.js:

* **Synchronous code** goes through the **call stack directly**.
* **Asynchronous code** (e.g., `setTimeout`, `fetch`, etc.) is handled by the **event loop** and placed in **callback/task queues**, not on the stack right away.

---

### Debug Tip:

When debugging:

* Use stack traces to **locate bugs** and **trace function calls**.
* You can use `console.trace()` to print the current stack trace without an error.

```js
function showTrace() {
  console.trace("Here’s the trace:");
}

showTrace();
```


