# JSON Parse vs Stringify in JavaScript

When working with `localStorage` or making HTTP requests (especially using `fetch`), we cannot directly store or send JavaScript objects. Instead, we must convert them to strings—specifically, **JSON strings**.

---

## Why Use `JSON.stringify()`

- JavaScript objects can't be stored directly in `localStorage` or sent in HTTP request bodies.
- We need to **serialize** the object into a JSON string format.

### Syntax:
```js
JSON.stringify(user)
```

This converts:
```js
{ name: "Bob", age: 30 }
```

Into:
```json
'{"name": "Bob", "age": 30}'
```

This string can now be safely stored or sent in a request.


## Why Use `JSON.parse()`

- Once we receive JSON data (as a string), we can't directly access its properties or iterate over it.
- We must **parse** the string back into a JavaScript object.

### Syntax:
```js
JSON.parse(jsonString)
```

---

## Valid vs Invalid JSON

### Valid JSON:
```json
'{"name": "Bob", "age": 30}'
```

### Invalid JSON:
```js
"{name: Bob}" // Missing double quotes around keys and values
```

---

## Using `JSON.parse()` in Fetch Requests

In `fetch` requests, we typically convert the response to an object like this:
```js
fetch(url)
  .then((response) => response.json())
```

This internally performs:
```js
response.text().then(text => JSON.parse(text))
```

---

## Using `JSON.parse()` Automatically in Express.js

In an Express.js backend, we often use middleware to parse incoming JSON request bodies:

```js
app.use(express.json());
```

After this middleware runs, the incoming JSON body is automatically parsed and stored as a JavaScript object in:

```js
req.body
```

You can now access it like any regular object.

---

## Summary

| Action                 | Method             | Converts From → To                   |
|------------------------|--------------------|--------------------------------------|
| Serialize for sending  | `JSON.stringify()` | JavaScript object → JSON string      |
| Parse for usage        | `JSON.parse()`     | JSON string → JavaScript object      |

Understanding this flow is essential for handling API calls, localStorage, and backend communication correctly.

