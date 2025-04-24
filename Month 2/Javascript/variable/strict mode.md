# JavaScript `'use strict'` Mode — Use Cases

Modern JavaScript supports “classes” and “modules” – advanced language structures (we’ll surely get to them), that enable use strict automatically. So we don’t need to add the "use strict" directive, if we use them.

So, for now "use strict"; is a welcome guest at the top of your scripts. Later, when your code is all in classes and modules, you may omit it.

## 1. Prevents usage of undeclared variables

Without strict mode, assigning to an undeclared variable creates a global variable. `'use strict'` throws an error instead.

```js
'use strict';

undeclaredVar = 10; // ReferenceError
```

---

## 2. Prevents assignment to read-only properties

Strict mode throws an error if you try to write to a non-writable property.

```js
'use strict';

const obj = {};
Object.defineProperty(obj, 'x', { value: 42, writable: false });
obj.x = 9; // TypeError
```

---

## 3. Prevents deleting non-deletable properties

Deleting properties like `Object.prototype` is not allowed under strict mode.

```js
'use strict';

delete Object.prototype; // TypeError
```

---

## 4. Prevents duplicate parameter names

Strict mode disallows duplicate parameter names in function declarations.

```js
'use strict';

new Function('a', 'a', 'return a + a;'); // SyntaxError
```

---

## 5. Converts silent errors into thrown errors

In non-strict mode, failing assignments to non-extensible objects are ignored. Strict mode throws an error.

```js
'use strict';

const obj = {};
Object.freeze(obj);
obj.newProp = 123; // TypeError
```

---

## 6. Makes `this` undefined in functions

In strict mode, `this` inside a regular function (not method) is `undefined` instead of the global object.

```js
'use strict';

function regularFunction() {
  console.log(this); // undefined
}
regularFunction();
```

---

## 7. Prevents accidental global creation via `this`

In strict mode, `this` does not refer to the global object when assigning variables.

```js
'use strict';

function createGlobal() {
  this.globalValue = 123; // Does not create a global variable
}
createGlobal();

console.log(typeof globalValue); // undefined
```

---

## 8. Disallows `with` statements

`with` is forbidden in strict mode because it makes code harder to predict and optimize.

```js
'use strict';

with (Math) {
  console.log(sin(0));
} // SyntaxError
```

---

## 9. Safer use of `eval`

Variables declared inside `eval` do not leak into the surrounding scope in strict mode.

```js
'use strict';

(function () {
  eval("var local = 123;");
  console.log(local); // ReferenceError
})();
```

---

## 10. Reserved words can't be used as identifiers

Strict mode prevents the use of reserved keywords (like `let`, `class`) as variable names.

```js
'use strict';

var let = 10; // SyntaxError
```

---

## Summary of Use Cases

| Use Case | Description |
|----------|-------------|
| 1        | Disallows undeclared variables |
| 2        | Prevents writing to read-only properties |
| 3        | Prevents deleting non-configurable properties |
| 4        | No duplicate parameter names |
| 5        | Converts silent assignments into errors |
| 6        | `this` is `undefined` in non-method functions |
| 7        | Prevents `this` from creating globals |
| 8        | Disallows `with` keyword |
| 9        | Prevents `eval` from polluting local scope |
| 10       | Disallows reserved keywords as variable names |
