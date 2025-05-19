## What Is the Event Loop?

In Node.js, the **event loop** is what allows **non-blocking I/O** operations. It handles operations like file reads, network requests, timers, etc., without blocking the main thread. It runs in **phases**, and each phase has a specific purpose.

---

## Phases of the Event Loop (in order):

1. **Timers** (→ `setTimeout()`, `setInterval()`)
2. **Pending Callbacks** (→ system-level callbacks like TCP errors)
3. **Idle, Prepare** (internal use)
4. **Poll** (→ fetch new I/O events, execute their callbacks)
5. **Check** (→ `setImmediate()` callbacks)
6. **Close Callbacks** (→ `socket.on('close')`, etc.)
7. **Microtasks** (`process.nextTick()`, Promises)

---

## 1. **Timers Phase**

* **What it does**: Executes callbacks from `setTimeout()` and `setInterval()` **whose threshold time has passed**.
* **Misconception**: People think `setTimeout(fn, 100)` means *exactly* 100ms later. But it really means: “at least 100ms later, as soon as possible.”

**Code from your example:**

```js
setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;
  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);
```

This sets a timer to **run after 100ms** — but not *exactly* after 100ms. It goes into the **Timers Queue** and waits until:

1. The 100ms delay has passed, and
2. The event loop has a chance to process timers (after current phase ends).

---

## 2. **Pending Callbacks Phase**

* Handles specific system operations like **TCP connection errors**.
* These are OS-level queued callbacks that couldn't be handled immediately in their native phase.

Example: If a socket gets `ECONNREFUSED`, it might be queued here for later execution.

---

## 3. **Poll Phase**

* **Two Main Jobs**:

  1. **Check for I/O events** (e.g. file read, sockets)
  2. **Run their callbacks**

* It **waits for I/O** to complete and then **executes callbacks synchronously**.

* If no I/O is pending, it:

  * Ends immediately **if** `setImmediate()` is waiting (goes to **check phase**).
  * Otherwise **waits for events** (unless timeout reached).

**Your example explained**:

```js
fs.readFile('/path/to/file', callback); // takes 95ms
```

* The event loop enters **poll phase**, sees:

  * 95ms file read pending
  * Timer threshold (100ms) not reached yet
* So it **waits for I/O** (polls)

→ File read completes after 95ms → its callback runs (takes 10ms)

→ At 105ms, timer’s 100ms has passed → event loop goes back to **timers** phase and executes it

That’s why you see **105ms** in output.

---

## 4. **Check Phase**

* Executes **`setImmediate()`** callbacks
* Only happens **after poll phase**
* If poll is idle and `setImmediate()` is queued, we move here right away

```js
setImmediate(() => {
  console.log("I'm from the check phase");
});
```

* Executes *after I/O callbacks* from poll phase

---

## 5. **Close Callbacks Phase**

* Runs callbacks like:

  * `'close'` event of sockets, file handles
  * E.g., `socket.destroy()` → `'close'` is emitted in this phase

---

## Difference Between `setTimeout()` vs `setImmediate()`

| Feature      | `setTimeout()`                             | `setImmediate()`                           |
| ------------ | ------------------------------------------ | ------------------------------------------ |
| Phase        | Timers Phase                               | Check Phase                                |
| Trigger Time | After **minimum** ms threshold (not exact) | After **poll phase ends**                  |
| Priority     | Delayed — depends on when it’s called      | Often faster if called inside I/O callback |
| Use Case     | Run code after X ms                        | Run code *after* I/O event finishes        |


If we run the following script which is not within an I/O cycle (i.e. the main module), the order in which the two timers are executed is non-deterministic, as it is bound by the performance of the process. For example:

```js
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});
```

However, if you move the two calls within an I/O cycle, the immediate callback is always executed first:

```js
fs.readFile('file.txt', () => {
  setTimeout(() => {
    console.log('timeout');     // likely second
  }, 0);

  setImmediate(() => {
    console.log('immediate');   // likely first
  });
});
```

**Output:**

```
immediate
timeout
```

Because: `setImmediate()` executes after the I/O phase, `setTimeout()` has to wait at least 0ms and be rescheduled.

---

## Summary of What Happens in Your Example

### Timeline:

| Time (ms) | Action                                          |
| --------- | ----------------------------------------------- |
| 0         | `setTimeout(..., 100)` scheduled                |
| 0         | `fs.readFile()` starts (takes 95ms)             |
| 95        | File read completes, callback runs (10ms work)  |
| 105       | Timer threshold passed → event loop executes it |

So even though the timer was set for 100ms, due to I/O and JS execution delay, it ran at \~105ms.

---

## Bonus: Microtasks Phase

* `process.nextTick()` and Promises (`.then()`) run **between every phase**, before moving to the next
* They are high-priority tasks

```js
setTimeout(() => console.log('timeout'));
setImmediate(() => console.log('immediate'));
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('promise'));
```

**Output:**

```
nextTick
promise
timeout / immediate (order varies)
```