## Loose Equality (`==`) vs Strict Equality (`===`)

```javascript
console.log(1 == 1n); // true
```
- This returns `true` because `==` performs type coercion.
- JavaScript converts `1n` (a BigInt) to a Number (`1`) before comparison.

```javascript
console.log(1 === 1n); // false
```
- This returns `false` because `===` checks both value and type.
- `1` is a `Number`, while `1n` is a `BigInt`, so they are not strictly equal.

---

## `Object.is()` vs `===`

The `Object.is()` method checks if two values are the same value. It is mostly similar to `===`, but it handles some edge cases differently, such as:

### Case 1: Signed Zero

```javascript
console.log(0 === -0);    // true
console.log(+0 === -0);   // true
console.log(-0 === -0);   // true
```
- According to `===`, `+0` and `-0` are considered equal.

```javascript
Object.is(0, -0);         // false
Object.is(+0, -0);        // false
Object.is(-0, -0);        // true
```
- `Object.is()` distinguishes between `+0` and `-0`.

### Case 2: NaN

```javascript
console.log(NaN === NaN);           // false
console.log(0 / 0 === NaN);         // false
```
- `NaN` is not equal to anything, even itself.
- `0 / 0` results in `NaN`, and since `NaN !== NaN`, both expressions return `false`.

```javascript
Object.is(NaN, 0 / 0);              // true
Object.is(NaN, Number.NaN);         // true
```
- `Object.is()` treats two `NaN` values as the same, unlike `===`.

---

Here are some common situations in JavaScript where you'll get `NaN` (Not a Number):

---

###  **Common Cases That Result in `NaN`:**

#### 1. **Math with undefined or non-numeric strings**
```javascript
undefined + 1          // NaN
"hello" * 3            // NaN
"123abc" - 5           // NaN
```

#### 2. **Invalid mathematical operations**
```javascript
Math.sqrt(-1)          // NaN
0 / 0                  // NaN
Infinity - Infinity    // NaN
```

#### 3. **Parsing a non-numeric string**
```javascript
parseInt("abc")        // NaN
parseFloat("12.3.4")   // NaN
Number("abc")          // NaN
```

#### 4. **Trying to perform math on `NaN`**
```javascript
NaN + 5                // NaN
NaN * 10               // NaN
```

#### 5. **Invalid operations with `Object` or `Symbol`**
```javascript
Math.max({})           // NaN
Number({})             // NaN
Number(Symbol())       // NaN (throws TypeError actually, depending on context)
```

#### 6. **Failed `parseInt` due to wrong radix**
```javascript
parseInt("123", "hello") // NaN
```

---

### Things that **look weird but are NOT `NaN`**
```javascript
parseInt("123abc")     // 123  ← stops at non-digit
Number(null)           // 0    ← gets coerced
"5" - 2                // 3    ← implicit coercion
```