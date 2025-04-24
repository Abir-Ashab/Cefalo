## JavaScript Event Loop (Text-Only Explanation)

JavaScript runs on a **single-threaded** execution model, meaning it can only execute one piece of code at a time. However, JavaScript is capable of handling asynchronous behavior through an architecture that includes the **event loop**.

---

### Core Components

1. **Call Stack**:  
   This is the primary execution context. It follows a "Last In, First Out" (LIFO) model. When a function is called, it's pushed onto the stack. When the function finishes executing, it is popped off. All synchronous code runs directly on the call stack.

2. **Web APIs** (provided by the browser or runtime like Node.js):  
   These are responsible for handling asynchronous tasks such as `setTimeout`, `setInterval`, AJAX requests, event listeners, etc. These are not part of JavaScript itself, but the environment.

3. **Callback Queue (also called Task Queue or Macro-task Queue)**:  
   When asynchronous operations finish (like `setTimeout`), their associated callback functions are placed in this queue, waiting for the call stack to be empty before they are executed.

4. **Microtask Queue**:  
   This holds high-priority tasks, such as the callbacks from `Promise.then()` or `queueMicrotask()`. These are always executed before anything in the callback queue once the call stack is clear.

5. **Event Loop**:  
   This is the engine that coordinates execution. It continuously checks:
   - If the call stack is empty.
   - If the microtask queue has any tasks, it processes all of them.
   - If the microtask queue is clear, it takes the next task from the callback queue and puts it on the call stack.

---

### Example

```javascript
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");
```

**Output:**

```
A
D
C
B
```

**Explanation:**

- "A" is logged first (synchronous).
- `setTimeout` is passed to the Web API and will be moved to the callback queue after the minimum 0ms delay.
- The `Promise` resolves immediately and its `.then()` callback is added to the microtask queue.
- "D" is logged (synchronous).
- Call stack is now empty.
- The event loop prioritizes the microtask queue, so it logs "C" next.
- After all microtasks are processed, it executes the task in the callback queue, logging "B".

---

### Macro-tasks vs Micro-tasks

- **Macro-tasks** include `setTimeout`, `setInterval`, `I/O operations`, and `setImmediate` (Node.js).
- **Micro-tasks** include `Promise.then`, `queueMicrotask`, and `MutationObserver`.
- Micro-tasks are executed **before** the event loop picks the next macro-task.

---

### Summary

- The **call stack** handles synchronous code.
- **Web APIs** handle asynchronous behavior.
- The **microtask queue** holds high-priority callbacks (like `Promise.then`).
- The **callback queue** holds standard asynchronous callbacks (like `setTimeout`).
- The **event loop** coordinates when and in what order all of this is processed.
