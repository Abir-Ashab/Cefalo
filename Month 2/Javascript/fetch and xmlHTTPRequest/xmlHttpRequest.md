## 1. Basic GET Request
```js
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/data');
xhr.onload = () => console.log(xhr.response);
xhr.onerror = () => console.error('Request failed');
xhr.send();
```

---

## 2. GET with URL Parameters
```js
const url = new URL('/api/user', location.origin);
url.searchParams.set('id', '123');

const xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.send();
```

---

## 3. POST Request (JSON Body)
```js
const xhr = new XMLHttpRequest();
xhr.open('POST', '/api/user');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({ name: 'John' }));
```

---

## 4. POST with FormData
```js
const formData = new FormData();
formData.append('name', 'John');

const xhr = new XMLHttpRequest();
xhr.open('POST', '/upload');
xhr.send(formData);
```

---

## 5. File Upload with Progress
```js
const xhr = new XMLHttpRequest();
xhr.open('POST', '/upload');
xhr.upload.onprogress = e => {
  console.log(`Uploaded ${e.loaded} of ${e.total}`);
};
xhr.send(fileInput.files[0]);
```

---

## 6. Set Custom Headers
```js
xhr.setRequestHeader('Authorization', 'Bearer token');
```

---

## 7. Read Response Headers
```js
xhr.onload = () => {
  console.log(xhr.getResponseHeader('Content-Type'));
  console.log(xhr.getAllResponseHeaders());
};
```

---

## 8. Abort a Request
```js
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api');
xhr.send();

setTimeout(() => xhr.abort(), 2000); // cancel after 2s
```

---

## 9. Handle Timeout
```js
xhr.timeout = 5000;
xhr.ontimeout = () => console.error('Timed out');
```

---

## 10. Monitor Download Progress
```js
xhr.onprogress = e => {
  if (e.lengthComputable) {
    console.log(`Received ${e.loaded} of ${e.total}`);
  }
};
```

---

## 11. JSON Response
```js
xhr.responseType = 'json';
xhr.onload = () => console.log(xhr.response.message);
```

---

## 12. Other Response Types
```js
xhr.responseType = 'blob';       // binary
xhr.responseType = 'arraybuffer'; // binary
xhr.responseType = 'document';  // XML/HTML
```

---

## 13. Synchronous Request (avoid unless critical)
```js
xhr.open('GET', '/api', false); // sync
xhr.send();
console.log(xhr.responseText);
```

---

## 14. Track Ready States (Legacy)
```js
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText);
  }
};
```

---

## 15. Cross-Origin Request with Credentials
```js
xhr.withCredentials = true;
xhr.open('GET', 'https://other.com/api');
xhr.send();
```

---

## 16. Upload JSON with `POST`
```js
const json = JSON.stringify({ name: 'Jane' });

xhr.open('POST', '/submit');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(json);
```

---

## 17. Parse All Response Headers
```js
const headers = xhr.getAllResponseHeaders().split('\r\n').reduce((acc, line) => {
  const [key, value] = line.split(': ');
  acc[key] = value;
  return acc;
}, {});
```