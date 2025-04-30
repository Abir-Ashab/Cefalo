### Definition

**Pass by Value**  
A copy of the actual value is passed. Any change made to the parameter inside a function does not affect the original value.

**Pass by Reference**  
A reference (memory address) to the original data is passed. Changes made through that reference affect the original value.

---

### How JavaScript Works

JavaScript is **always pass-by-value**. However:

- **Primitive types** (like `number`, `string`, `boolean`, `null`, `undefined`, `symbol`, and `bigint`) are copied by value.
- **Objects, arrays, and functions** are copied by value **of the reference**, which means that the reference (not the object itself) is passed by value.

That’s why we often say: "Objects behave like they are passed by reference," even though technically it's the reference that's passed by value.

---

### Example 1: Primitive Type (Pass by Value)
```javascript
let a = 10;

function change(x) {
  x = 20;
}

change(a);
console.log(a); // Output: 10
```
Here, the value of `a` is passed to `x`. Changing `x` does not affect `a`.

---

### Example 2: Object (Pass by Reference-like)
```javascript
let obj = { name: "Alice" };

function modify(o) {
  o.name = "Bob";
}

modify(obj);
console.log(obj.name); // Output: "Bob"
```
Here, the reference to `obj` is passed to `o`. Since `o` and `obj` point to the same object, modifying `o` affects `obj`.

---

### Important Distinction: Reassigning the Reference
```javascript
let obj = { name: "Alice" };

function replace(o) {
  o = { name: "Charlie" };
}

replace(obj);
console.log(obj.name); // Output: "Alice"
```
In this case, `o` is a copy of the reference to `obj`. Reassigning `o` to a new object does not change the reference held by `obj`.

---

### Summary Table

| Data Type     | Passed As            | Can Modify Original? | Notes                              |
|---------------|----------------------|-----------------------|------------------------------------|
| Primitive     | Value                | No                    | Safe from outside modification     |
| Object/Array  | Reference (by value) | Yes (if mutated)      | Affects original through reference |
| Object/Array  | Reference reassigned | No                    | Only internal reference changes    |