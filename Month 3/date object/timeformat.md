## 1. **ISO Format** (`toISOString()`)

* **Format:** `YYYY-MM-DDTHH:mm:ss.sssZ`
* **Time Zone:** UTC
* **Standard:** [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
* **Use Case:** APIs, databases, JSON, and international data exchange.

```javascript
let date = new Date();
console.log(date.toISOString());  
// Example: "2025-05-12T12:34:56.789Z"
```

---

## 2. **UTC Format** (`toUTCString()`)

* **Format:** `Day, DD Mon YYYY HH:mm:ss GMT`
* **Time Zone:** UTC
* **Use Case:** Human-readable, mostly legacy.

```javascript
console.log(date.toUTCString()); 
// Example: "Mon, 12 May 2025 12:34:56 GMT"
```

---

## 3. **Locale Format** (`toLocaleString()` and friends)

* **Format:** Depends on **system locale** (e.g., US, UK, BD)
* **Time Zone:** Local
* **Use Case:** User-facing display.

```javascript
console.log(date.toLocaleString());        
// Example (US): "5/12/2025, 12:34:56 PM"
console.log(date.toLocaleDateString());    
// Example: "5/12/2025"
console.log(date.toLocaleTimeString());    
// Example: "12:34:56 PM"
```

You can also pass **locales and options**:

```javascript
console.log(date.toLocaleString('en-GB', { timeZone: 'UTC' }));
// "12/05/2025, 12:34:56"
```

---

## 4. **Default String Format** (`toString()`)

* **Format:** `Day Mon DD YYYY HH:mm:ss GMT±hhmm (Time Zone Name)`
* **Time Zone:** Local
* **Use Case:** Quick inspection

```javascript
console.log(date.toString());
// "Mon May 12 2025 18:34:56 GMT+0600 (Bangladesh Standard Time)"
```

---

## 5. **Unix Timestamp** (`getTime()`, `valueOf()`)

* **Format:** Integer (milliseconds since Jan 1, 1970 UTC)
* **Use Case:** Storage, time difference calculations

```javascript
console.log(date.getTime()); 
// Example: 1747062896789
```

---

## Summary Table

| Method             | Format Example                      | Time Zone | Format Type     |
| ------------------ | ----------------------------------- | --------- | --------------- |
| `toISOString()`    | `2025-05-12T12:34:56.789Z`          | UTC       | ISO 8601        |
| `toUTCString()`    | `Mon, 12 May 2025 12:34:56 GMT`     | UTC       | UTC standard    |
| `toLocaleString()` | `5/12/2025, 6:34:56 PM` (varies)    | Local     | Locale-specific |
| `toString()`       | `Mon May 12 2025 18:34:56 GMT+0600` | Local     | Default format  |
| `getTime()`        | `1747062896789`                     | UTC       | Unix timestamp  |


