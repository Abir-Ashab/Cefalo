# Normal Functions vs Arrow Functions

## 1. **Syntax**

### Normal Function
```js
function add(a, b) {
  return a + b;
}
```

### Arrow Function
```js
const add = (a, b) => a + b;
```

Arrow functions offer a shorter syntax and are often used for inline or small functions.

---

## 2. **`this` Binding**

### Normal Function
- Has its own `this` context.
- The value of `this` depends on how the function is **called**.

```js
const obj = {
  value: 10,
  getValue: function() {
    return this.value;
  }
};
console.log(obj.getValue()); // 10
```

### Arrow Function
- Does **not** have its own `this`.
- Inherits `this` from the surrounding **lexical scope**.

```js
const obj = {
  value: 10,
  getValue: () => {
    return this.value;
  }
};
console.log(obj.getValue()); // undefined (inherited from outside the object)
```

---

## 3. **Usage as Methods**

- **Normal functions** are suitable for defining object methods.
- **Arrow functions** should **not** be used as object methods if you rely on `this`.

```js
const person = {
  name: "Alice",
  greet: function() {
    return `Hi, I'm ${this.name}`;
  }
};
console.log(person.greet()); // "Hi, I'm Alice"
```

```js
const person = {
  name: "Alice",
  greet: () => {
    return `Hi, I'm ${this.name}`;
  }
};
console.log(person.greet()); // "Hi, I'm undefined"
```

---

## 4. **Arguments Object**

### Normal Function
- Has access to the special `arguments` object.
```js
function logArgs() {
  console.log(arguments);
}
logArgs(1, 2, 3); // [1, 2, 3]
```

### Arrow Function
- Does **not** have its own `arguments` object.

```js
const logArgs = () => {
  console.log(arguments); // ReferenceError
};
logArgs(1, 2, 3);
```

To handle arguments in arrow functions, use rest parameters:

```js
const logArgs = (...args) => {
  console.log(args);
};
logArgs(1, 2, 3); // [1, 2, 3]
```

---

## 5. **Constructor Usage**

### Normal Function
- Can be used as constructors with the `new` keyword.

```js
function Person(name) {
  this.name = name;
}
const p = new Person("Alice");
```

### Arrow Function
- Cannot be used as constructors.

```js
const Person = (name) => {
  this.name = name;
};
const p = new Person("Alice"); // TypeError
```

---

## Summary Table

| Feature            | Normal Function       | Arrow Function                |
|--------------------|------------------------|--------------------------------|
| `this` binding      | Dynamic (call-time)     | Lexical (from outer scope)     |
| `arguments` object | Available               | Not available                  |
| Constructor usage  | Yes (`new`)             | No                             |
| Syntax             | Verbose                 | Concise                        |
| Best for           | Methods, constructors   | Callbacks, small functions     |

