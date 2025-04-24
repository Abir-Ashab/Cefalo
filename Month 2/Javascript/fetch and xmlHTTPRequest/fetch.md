## 1. Basic GET Request
```js
fetch('/api/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---

## 2. GET with Query Parameters
```js
const params = new URLSearchParams({ userId: 1 });
fetch(`/api/user?${params}`)
  .then(res => res.json())
  .then(console.log);
```

---

## 3. POST Request (JSON Body)
```js
fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John', age: 30 })
})
.then(res => res.json())
.then(console.log);
```

---

## 4. PUT Request
```js
fetch('/api/users/123', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Updated Name' })
})
.then(res => res.json())
.then(console.log);
```

---

## 5. DELETE Request
```js
fetch('/api/users/123', {
  method: 'DELETE'
})
.then(res => res.ok ? 'Deleted' : 'Failed')
.then(console.log);
```

---

## 6. Sending Form Data
```js
const form = new FormData();
form.append('username', 'john');
form.append('file', fileInput.files[0]);

fetch('/upload', {
  method: 'POST',
  body: form
})
.then(res => res.text())
.then(console.log);
```

---

## 7. Custom Headers (e.g., Auth Token)
```js
fetch('/secure-data', {
  headers: {
    'Authorization': 'Bearer my-token'
  }
})
.then(res => res.json())
.then(console.log);
```

---

## 8. With Cookies (Authentication)
```js
fetch('/profile', {
  credentials: 'include' // required for cookies
})
.then(res => res.json())
.then(console.log);
```

---

## 9. CORS (Cross-Origin Request)
```js
fetch('https://external-api.com/data', {
  mode: 'cors'
})
.then(res => res.json())
.then(console.log);
```

---

## 10. Handling Text Response
```js
fetch('/hello.txt')
  .then(res => res.text())
  .then(console.log);
```

---

## 11. File Download (Blob)
```js
fetch('/download/file.pdf')
  .then(res => res.blob())
  .then(blob => {
    const url = URL.createObjectURL(blob);
    window.open(url);
  });
```

---

## 12. Stream Large Response (Advanced)
```js
fetch('/large-file')
  .then(res => {
    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    return reader.read().then(function process({ done, value }) {
      if (done) return;
      console.log(decoder.decode(value));
      return reader.read().then(process);
    });
  });
```

---

## 13. Timeout Wrapper
```js
function fetchWithTimeout(url, options = {}, timeout = 5000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
}
```

---

## 14. Handling HTTP Errors
```js
fetch('/api')
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(console.log)
  .catch(console.error);
```

---

## 15. Custom Request Object
```js
const request = new Request('/api', {
  method: 'POST',
  headers: { 'X-Custom': '123' },
  body: JSON.stringify({ key: 'value' })
});

fetch(request)
  .then(res => res.json())
  .then(console.log);
```
