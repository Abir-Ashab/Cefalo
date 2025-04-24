### `for...in`
- **Used for:** Iterating over **enumerable properties (keys)** of an object.
- **Returns:** The **keys** (property names) of the object (as strings).
- **Best for:** Objects (not arrays, generally).

#### Example:
```javascript
const person = {
  name: 'Alice',
  age: 25
};

for (const key in person) {
  console.log(key);       // name, age
  console.log(person[key]); // Alice, 25
}
```

---

### `for...of`
- **Used for:** Iterating over **iterable objects** like arrays, strings, maps, sets, etc.
- **Returns:** The **values** of the iterable.
- **Best for:** Arrays, strings, etc.

#### Example:
```javascript
const fruits = ['apple', 'banana', 'cherry'];

for (const fruit of fruits) {
  console.log(fruit);  // apple, banana, cherry
}
```

---

### Common Mistake:
Using `for...in` on arrays. It will loop through **indexes** (as strings) and enumerable objects, **not** values, and may include prototype properties.

```javascript
const arr = ['a', 'b', 'c'];

for (const index in arr) {
  console.log(index);     // 0, 1, 2
  console.log(arr[index]); // a, b, c
}
```
```javascript
let object = {
  key1: "value1",
  key2: "value2"
}
for (const index in object) {
  console.log(index); // key1, key2
}
```

Use `for...of` for arrays instead.

