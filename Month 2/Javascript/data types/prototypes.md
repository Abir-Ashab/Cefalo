# JavaScript Prototype and Object Manipulation

This document explains how to create objects, establish prototype chains, inspect and change object prototypes in JavaScript.

---

## 1. Creating Objects and Prototypes

### Basic Object Creation

```js
var a = { x: 10, y: 20 };
```

Creates a simple object `a` with two properties: `x` and `y`.

### Creating a New Object with a Given Prototype

```js
var b = Object.create(a);
```

Now, `b` is an object that inherits from `a`.

```js
console.log('b.x:', b.x); // 10
console.log('b.y:', b.y); // 20
```

Although `b` does not have its own properties `x` and `y`, they are accessible via the prototype `a`.

### Adding Own Properties to `b`

```js
b.p = 100;
b.q = 200;

console.log('b.p:', b.p); // 100
console.log('b.q:', b.q); // 200
```

Now, `b` has its own properties `p` and `q`.

### Chained Prototypes

```js
var c = Object.create(b);

console.log(c.x); // 10
console.log(c.y); // 20
console.log(c.p); // 100
console.log(c.q); // 200
```

Object `c` inherits from `b`, which inherits from `a`. So `c` has access to all properties from both.

---

## 2. Identifying Own and Inherited Properties

```js
var proto = { z: 0 };
var own = Object.create(proto);
own.x = 0;
own.y = 0;
```

- `own` has its own properties `x`, `y`
- It inherits property `z` from `proto`

### Checking Own Properties

```js
console.log(own.hasOwnProperty('x')); // true
console.log(own.hasOwnProperty('y')); // true
console.log(own.hasOwnProperty('z')); // false
```

### Checking Property Existence (including prototype)

```js
console.log('z' in own); // true
```

> `in` checks both own and inherited properties.

---

## 3. Retrieving Prototypes

### Using `__proto__`

```js
console.log([1, 2, 3].__proto__ === Array.prototype); // true
console.log({ x: 0 }.__proto__ === Object.prototype); // true
console.log((10).__proto__ === Number.prototype); // true
console.log('10'.__proto__ === String.prototype); // true

var a = {};
console.log(Object.create(a).__proto__ === a); // true
```

### Function Behavior

```js
function F() {}

console.log(F.__proto__ === F.prototype); // false
console.log(F.__proto__ === Function.prototype); // true
console.log((new F()).__proto__ === F.prototype); // true
```

---

## 4. Retrieving Prototypes (Standard Way)

### Using `Object.getPrototypeOf()`

```js
console.log(Object.getPrototypeOf([1, 2, 3]) === Array.prototype); // true
console.log(Object.getPrototypeOf({ x: 0 }) === Object.prototype); // true
console.log(Object.getPrototypeOf(10) === Number.prototype); // true
console.log(Object.getPrototypeOf('10') === String.prototype); // true

var a = {};
console.log(Object.getPrototypeOf(Object.create(a)) === a); // true
```

### Function Behavior

```js
function F() {}

console.log(Object.getPrototypeOf(F) === F.prototype); // false
console.log(Object.getPrototypeOf(F) === Function.prototype); // true
console.log(Object.getPrototypeOf(new F()) === F.prototype); // true
```

---

## 5. Changing an Object's Prototype

### Method 1: Using `__proto__`

```js
var a = { x: 10, y: 20 };
var b = { p: 100, q: 200 };

b.__proto__ = a;

console.log('b.x:', b.x); // 10
console.log('b.y:', b.y); // 20
console.log('b.p:', b.p); // 100
console.log('b.q:', b.q); // 200
```

### Method 2: Using `Object.setPrototypeOf()`

```js
var a = { x: 10, y: 20 };
var b = { p: 100, q: 200 };

Object.setPrototypeOf(b, a);

console.log('b.x:', b.x); // 10
console.log('b.y:', b.y); // 20
console.log('b.p:', b.p); // 100
console.log('b.q:', b.q); // 200
```

> While `__proto__` works, `Object.setPrototypeOf()` is the standard and preferred method.

---

## Summary

- Objects can inherit from other objects using `Object.create()`.
- Use `hasOwnProperty()` to check for own properties.
- Use `in` to check for both own and inherited properties.
- `__proto__` and `Object.getPrototypeOf()` let you access prototypes.
- Use `Object.setPrototypeOf()` to change an existing object's prototype safely.
```
