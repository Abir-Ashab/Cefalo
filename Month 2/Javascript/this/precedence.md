## 1. `bind()` vs `call()`

```js
function greet() {
  console.log("Hello from:", this.name);
}

const boundGreet = greet.bind({ name: "Bound" });

console.log("Bound:");
boundGreet(); // Outputs: Hello from: Bound

console.log("Bound + call() (trying to override bind):");
boundGreet.call({ name: "Call" }); // Still outputs: Hello from: Bound
```

### Explanation:
- `bind()` creates a new function permanently bound to the provided object.
- Once a function is bound using `bind()`, calling it with `call()` cannot override the `this` context.
- This demonstrates that `bind()` has higher precedence over `call()` when determining `this`.

---

## 2. `bind()` vs Object Method Binding

```js
function talk() {
  console.log(this.name);
}

const user = {
  name: "User",
  talk: talk.bind({ name: "Bound" })
};

user.talk(); // Outputs: Bound
```

### Explanation:
- Even though `talk` is assigned as a method of `user`, the `bind()` function permanently binds it to `{ name: "Bound" }`.
- As a result, the method does **not** use the `user` object’s `this`, but the one provided in the `bind()` call.
- This shows that `bind()` overrides the implicit object context during method invocation.

---

## 3. Global vs Object Context with `call()`

```js
const globalName = "Global";
var name = globalName;

const obj = {
  name: "Object",
  greet: greet
};

console.log("Direct call with call():");
greet.call({ name: "Call" }); // Outputs: Hello from: Call

console.log("Object method:");
obj.greet(); // Outputs: Hello from: Object

console.log("Global scope:");
greet(); // Outputs: Hello from: Global (in non-strict mode)
```

### Explanation:
- `call()` immediately invokes the function with a specified `this` context.
- When called as a method of `obj`, the function uses `obj` as `this`.
- When invoked alone in global scope (non-strict mode), `this` falls back to the global object (`window` in browsers, where `var name` attaches it to `window`).

---

## Summary Table

| Case                                     | `this` Value                       | Notes                                                                 |
|------------------------------------------|------------------------------------|-----------------------------------------------------------------------|
| `bind().call()` on a function            | Bound object in `bind()`           | `bind()` takes precedence and can't be overridden by `call()`         |
| Bound function assigned as object method | Bound object                       | `bind()` locks `this`, even if method is assigned to another object   |
| Function called with `call()`            | Object passed to `call()`          | `call()` sets `this` immediately for the function                     |
| Function as object method                | Object owning the method           | Regular method behavior                                               |
| Function in global scope (non-strict)    | Global object                      | In strict mode, `this` would be `undefined`                           |

---