# `BigInt`

JavaScript's default `Number` type is a floating-point number based on the IEEE-754 standard. It can safely represent integers in the range:

```
-(2^53 - 1) to 2^53 - 1
```

Trying to go beyond that? You lose precision.

---

### 🔹 How to create a `BigInt`

You can create a `BigInt` in two ways:

#### 1. Using the `n` suffix:

```js
const big = 1234567890123456789012345678901234567890n;
console.log(big); // → 1234567890123456789012345678901234567890n
```

#### 2. Using the `BigInt()` function:

```js
const big = BigInt("1234567890123456789012345678901234567890");
```

---

### 🔹 Operations with `BigInt`

You can do all the usual math operations, but only with other `BigInt` values:

```js
let a = 10n;
let b = 20n;

console.log(a + b); // 30n
console.log(a * b); // 200n
```

**Mixing `BigInt` and `Number` directly causes an error**:

```js
let a = 10n;
let b = 20; // Regular number
console.log(a + b); // TypeError: Cannot mix BigInt and other types
```

You need to convert:

```js
console.log(a + BigInt(b)); 
```

---

### 🔹 Comparison works fine:

```js
console.log(10n === 10); // false (different types)
console.log(10n == 10);  // true (loose equality)
```

