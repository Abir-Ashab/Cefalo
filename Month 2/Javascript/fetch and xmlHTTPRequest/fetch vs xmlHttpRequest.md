## XMLHttpRequest vs Fetch in JavaScript

### 1. Syntax & Simplicity

**fetch (Modern, Promise-based):**
```js
fetch('https://api.example.com/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

**XMLHttpRequest (Old, Callback-based):**
```js
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data');
xhr.onload = function () {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
  }
};
xhr.onerror = function () {
  console.error('Request failed');
};
xhr.send();
```

**Verdict:** `fetch` is cleaner and easier to read.

---

### 2. Return Type

- `fetch` returns a **Promise**, allowing chaining and `async/await`.
- `XMLHttpRequest` uses **callbacks** and events like `onload` and `onerror`.

---

### 3. Error Handling

- `fetch` only rejects on **network errors**, not HTTP errors like 404 or 500. You must manually check `res.ok`.

Example:
```js
fetch(url)
  .then(res => {
    if (!res.ok) throw new Error("HTTP Error");
    return res.json();
  });
```

- `XMLHttpRequest` provides full access to `status` and `statusText`.

---

### 4. CORS and Credentials

Both support CORS and credentials.

- With `fetch`:
```js
fetch(url, { credentials: 'include' });
```

- With `XMLHttpRequest`:
```js
xhr.withCredentials = true;
```

---

### 5. Streaming & Advanced Features

- `fetch` supports **streaming**, `AbortController`, and custom `Request`/`Response` objects.
- `XMLHttpRequest` does **not** support streams.

---

### 6. Browser Support

- `fetch` is supported in all **modern browsers**.
- `XMLHttpRequest` is supported in **all browsers**, including Internet Explorer.

---

## Summary Table

| Feature               | XMLHttpRequest            | fetch                    |
|-----------------------|---------------------------|---------------------------|
| Style                 | Callback-based            | Promise-based             |
| Simplicity            | Verbose                   | Clean & readable          |
| Streaming             | Not supported           |  Supported               |
| async/await           | Hard to use             |  Native support          |
| HTTP Error Handling   | Manual                    | Needs `.ok` check         |
| Progress Events       |  Supported               | Not directly supported  |
| Browser Support       | All browsers              | Modern browsers only      |
| CORS / Credentials    |  Supported               |  Supported               |

---

## When to Use

- Use **fetch** for modern applications.
- Use **XMLHttpRequest** only for:
- Legacy browser support (like IE11)
- Upload/download progress tracking
