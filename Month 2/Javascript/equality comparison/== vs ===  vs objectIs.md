# JavaScript Equality: `==`, `===`, `Object.is()`, and SameValueZero

JavaScript offers different ways to compare values, each with subtle differences. This document explores the behavior of:

- Loose Equality (`==`)
- Strict Equality (`===`)
- `Object.is()` (SameValue)
- SameValueZero Algorithm

---

## Loose Equality (`==`)

Loose equality performs type coercion when comparing two values. It converts the operands to the same type before making the comparison.

```js
console.log(1 == 1n); // true
```

In the example above, `1n` (BigInt) is coerced to a regular number for comparison. Hence, the result is `true`.

---

## Strict Equality (`===`)

Strict equality does **not** perform type coercion. It checks whether both **type and value** are the same.

```js
console.log(1 === 1n); // false
```

Since `1` is a number and `1n` is a BigInt, the types differ and the result is `false`.

---

## `Object.is()` – SameValue Algorithm 

`Object.is()` is used to determine whether two values are **exactly the same**. It is similar to `===`, but handles special cases differently:

### Case 1: Signed Zero

```js
console.log(0 === -0);      // true
console.log(+0 === -0);     // true
console.log(-0 === -0);     // true

console.log(Object.is(0, -0));    // false
console.log(Object.is(+0, -0));   // false
console.log(Object.is(-0, -0));   // true
```

`Object.is()` distinguishes between `+0` and `-0`, whereas `===` considers them equal.

### Case 2: NaN

```js
console.log(NaN === NaN);        // false
console.log(0 / 0 === NaN);      // false

console.log(Object.is(NaN, 0 / 0));      // true
console.log(Object.is(NaN, Number.NaN)); // true
```

`Object.is()` treats `NaN` as equal to itself, which is not the case for `===`.

---

## SameValueZero Algorithm

The **SameValueZero** equality algorithm is used internally in JavaScript, such as in:

- `Array.prototype.includes()`
- `Set`
- `Map`

It differs from strict equality(===) in one key way:
- It treats `NaN` as equal to `NaN` like `Object.is`

### Custom Implementation

```js
function sameValueZero(x, y) {
    if (typeof x === "number" && typeof y === "number") {
        // x and y are equal (may be -0 and 0) or they are both NaN
        return x === y || (x !== x && y !== y);
    }
    return x === y;
}

console.log(sameValueZero(NaN, NaN)); // true
```
**return x === y || (x !== x && y !== y);**
This implementation returns `true` either for `+0 === -0` by `x === y` and `Nan !== Nan"` by `x !== x && y !== y`.

---

## Summary Table

| Comparison Type   | Operator / Method       | Type Checked | NaN === NaN | +0 === -0 | Description                                   |
|-------------------|-------------------------|--------------|-------------|------------|-----------------------------------------------|
| Loose Equality     | `==`                   | No           | false       | true       | Coerces values to the same type before compare |
| Strict Equality    | `===`                  | Yes          | false       | true       | Requires both type and value to match         |
| SameValue          | `Object.is()`          | Yes          | true        | false      | Distinguishes +0/-0, treats NaN as equal      |
| SameValueZero      | `includes`, `Set`, etc | Yes          | true        | true       | Treats NaN as equal, +0/-0 as equal           |

---

## Conclusion

When comparing values in JavaScript, it's essential to choose the right equality method based on your needs. Use:

- `==` for loose comparison (rarely recommended)
- `===` for safe, strict comparison
- `Object.is()` for precise value identity
- SameValueZero logic for array or set operations
```