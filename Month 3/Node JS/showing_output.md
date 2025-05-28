### 1. `process.stdout.write("This is standard output\n")`

* Writes directly to the standard output stream.
* Does **not** automatically add a newline; you must include `\n` manually.
* Best for precise control over terminal output (e.g., progress bars, animations).
* Output goes to `stdout`.

---

### 2. `process.stderr.write("This is an error\n")`

* Writes directly to the standard error stream.
* Also requires manual newline characters.
* Typically used for printing error messages or warnings.
* Output goes to `stderr`, which can be separated from `stdout` (useful in scripting or logging).

---

### 3. `console.log("This is console log")`

* A convenient wrapper around `process.stdout.write`.
* Automatically adds a newline at the end.
* Automatically formats variables, objects, and expressions.
* Suitable for general-purpose logging and debugging.
* Output goes to `stdout`.

---

### Summary 

| Feature          | `process.stdout.write()`     | `process.stderr.write()`  | `console.log()`         |
| ---------------- | ---------------------------- | ------------------------- | ----------------------- |
| Adds newline     | No                           | No                        | Yes                     |
| Output stream    | `stdout`                     | `stderr`                  | `stdout`                |
| Formats objects  | No                           | No                        | Yes                     |
| Primary use case | Controlled output formatting | Error or warning messages | General-purpose logging |
