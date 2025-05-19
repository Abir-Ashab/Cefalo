### Node.js Debugger

The **Node.js debugger** is a tool that helps developers inspect and control code execution step by step. It allows you to pause your program, examine variables, trace execution flow, and find bugs more easily.

---

#### What is the `debugger` Statement?

The `debugger;` statement in JavaScript is a manual breakpoint. When Node.js encounters it, the program pauses (if a debugger is attached), allowing you to inspect the current state.

**Example:**

```js
function testDebug() {
  const a = 5;
  const b = 10;
  debugger; // Pauses execution here
  const c = a + b;
  console.log(c);
}
testDebug();
```

---

#### How to Run Node.js in Debug Mode

Use the command:

```bash
node inspect index.js
```

This starts Node.js in debug mode and pauses on the first line of executable code by default.

You might see:

```
< Debugger listening on ws://127.0.0.1:9229/...
< Debugger attached.
Break on start in index.js:8
```

Node breaks at the first call (`testDebug()` in this case), not inside the function.

---

#### Why it Doesn't Pause at the `debugger;` Line Immediately

When you start debugging with `node inspect`, Node breaks **before executing any code**. It pauses at the start of the script — at the first line of top-level code — not inside a function or block. Even if there’s a `debugger;` inside a function, Node won’t reach it until that function is actually executed.

To reach the `debugger;` line inside `testDebug()`, you need to resume execution using the debugger command:

```bash
cont
```

This continues the program until it hits the `debugger;` statement, where it will pause again.

---

#### Common Debugger Commands

* `cont` or `c` – Continue execution until the next breakpoint.
* `next` or `n` – Move to the next line in the current function.
* `step` or `s` – Step into the function being called.
* `out` or `o` – Step out of the current function.
* `repl` – Enter REPL mode to inspect or evaluate expressions.
* `Ctrl + C` – Exit the debugger.

---

#### Alternative Debugging Methods

For a more interactive graphical experience, use:

```bash
node --inspect-brk index.js
```

Then open Chrome and visit `chrome://inspect` to debug using DevTools.


