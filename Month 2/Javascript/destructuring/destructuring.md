# JavaScript Destructuring

## 1. Array Destructuring

### Basic Destructuring
```js
let a, b;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20
```
Values from the array are assigned to variables `a` and `b` respectively.

---

### Using the Rest Operator
```js
let a, b, rest;
[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(rest); // [30, 40, 50]
```
The `...rest` syntax captures the remaining elements of the array as a new array.

---

### Ignored Elements and Limits
```js
[a, b] = [10, 20, 30];
```
Only the first two values are assigned. The third value (`30`) is ignored because no variable (e.g., `rest`) is used to capture it.

---

### Destructuring a Simple Array
```js
const arr = [1, 2, 3];
const [a, b, c] = arr;
```
Variables `a`, `b`, and `c` receive the respective values from the array.

---

### Ignoring Elements
```js
function f() {
  return [1, 2, 3];
}

const [a, , b] = f();
console.log(a); // 1
console.log(b); // 3
```
The second value (`2`) is skipped using a comma without a variable.

---

## 2. Object Destructuring

### Basic Destructuring
```js
const obj = { a: 1, b: 2, c: 3 };
const { a, b, c } = obj;
```
Each variable is assigned the corresponding value from the object based on key names.

---

### Binding and Renaming Variables
```js
const obj = { a: 1, b: { c: 2 } };

const {
  a: x,
  b: { c: d },
} = obj;

console.log(d); // 2
console.log(x); // 1
```
- `x` is assigned the value of `a`.
- `d` is assigned the value of nested property `b.c`.

---

### Reassignable Bindings
```js
const { a } = obj; // `a` is a constant
let {
  b: { c: d },
} = obj; // `d` is a re-assignable variable
```
Destructuring can be combined with different declaration types (`const`, `let`).

---

## 3. Destructuring with Rest and Property Access

```js
let [a, b, ...{ length }] = [1, 2, 3];
console.log(a, b, length); // 1, 2, 1
```
- The rest syntax captures `[3]`
- Then `{ length }` accesses the `.length` property of the resulting array (`[3].length === 1`)

```js
[a, b, ...length] = [1, 2, 3];
console.log(a, b, length); // 1, 2, [3]
```
Now `length` is an array that contains the remaining elements.

---

## 4. Default Values in Destructuring

### Default with Arrays
```js
const [a = 1] = [];
console.log(a); // 1
```
Default value is used because the array is empty.

---

### Default with Objects
```js
const { b = 2 } = { b: undefined };
console.log(b); // 2

const { c = 2 } = { c: null };
console.log(c); // null
```
- If the property is `undefined` or missing, the default is used.
- If the property exists and is `null`, the default is **not** used.
