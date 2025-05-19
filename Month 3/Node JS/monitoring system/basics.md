### Node.js `--watch` Option 

The `--watch` flag in Node.js is used to automatically restart your program whenever a file it depends on changes. This is helpful during development, so you don’t need to manually stop and start the server each time you update the code.

---

### Example

Suppose you have a file called `server.js`:

```js
// server.js
console.log("Server is running at", new Date().toLocaleTimeString());
```

You can run this with:

```bash
node --watch server.js
```

Now, whenever you make changes to `server.js` and save the file, Node.js will automatically restart the program and execute the updated code.

---

### What Happens

1. You run the command:

   ```
   node --watch server.js
   ```
2. Node starts the program and prints:

   ```
   Server is running at 14:30:00
   ```
3. You edit and save the file.
4. Node detects the change and prints:

   ```
   Restarting...
   Server is running at 14:30:15
   ```

---

### Notes

* This feature was introduced in Node.js version 18.
* By default, it watches `.js`, `.mjs`, and `.json` files.
* You can specify which directories or files to watch using `--watch-path`:

  ```bash
  node --watch --watch-path=src server.js
  ```
* You can also ignore certain files or folders:

  ```bash
  node --watch --watch-ignore="**/node_modules/**" server.js
  ```

---

### Alternative: `nodemon`

Before `--watch` existed in Node.js, developers commonly used a separate tool called `nodemon`, which provides similar functionality. You can still use it if you need more customization.

Install and use with:

```bash
npm install -g nodemon
nodemon server.js
```

---

### Summary

* `--watch` helps during development by restarting your script automatically when files change.
* It simplifies the workflow, especially for server-side applications.
* It works with recent versions of Node.js (v18 and later).
* For advanced usage, `nodemon` is still a popular alternative.

