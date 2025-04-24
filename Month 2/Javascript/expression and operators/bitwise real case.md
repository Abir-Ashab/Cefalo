### 1. **Bitwise AND (`a & b`)**

**Use Case: Flag Checking / Permissions**

- When working with **bit flags**, `&` helps check whether a specific flag is **set**.

```js
const READ = 1;   // 0001
const WRITE = 2;  // 0010
const EXEC = 4;   // 0100

let userPermission = READ | WRITE; // 0011 (has read and write)

if (userPermission & READ) {
    console.log("User has read permission");
}
```

---

### 2. **Bitwise OR (`a | b`)**

**Use Case: Setting Flags**

- You can **combine permissions** or **set a flag** using OR.

```js
let permissions = 0;
permissions = permissions | READ;  // Set READ permission
permissions = permissions | EXEC;  // Add EXEC permission
```

---

### 3. **Bitwise XOR (`a ^ b`)**

**Use Case: Toggling Flags or Swapping Values**

- XOR is often used to **toggle** bits or **swap two values without a temporary variable**.

```js
// Toggle a flag
let flags = 0b1010;
let TOGGLE_BIT = 0b0010;
flags ^= TOGGLE_BIT; // Bit at position toggled

// Swap two numbers using XOR
let a = 5, b = 3;
a ^= b;
b ^= a;
a ^= b;
console.log(a, b); // 3, 5
```

---

### 4. **Bitwise NOT (`~a`)**

**Use Case: Inverting Bits / Quick Math Trick for Floor -1**

- Often used in **bitmasking**, or as a **shorthand for `-x - 1`**.

```js
console.log(~5);  // -6
// Trick: if you want to use `indexOf()` and return -1 safely:
if (~str.indexOf("example")) {
    console.log("Found!");
}
```

> `~(-1)` = `0`, which is falsy, so you can use this in clever conditionals.

---

### 5. **Left Shift (`a << b`)**

**Use Case: Efficient Multiplication by Powers of 2**

```js
let x = 5;        // 00000101
let y = x << 1;   // 00001010 = 10 (5 * 2)
let z = x << 3;   // 00101000 = 40 (5 * 2^3)
```

- Also used in **encoding**, **graphics**, and **binary protocols**.

---

### 6. **Sign-propagating Right Shift (`a >> b`)**

**Use Case: Division by Powers of 2 (for signed integers)**

```js
let x = -8;
let y = x >> 1; // -4 (preserves the sign bit)
```

- Useful for **efficient division** while maintaining the **sign** of a number.

---

### 7. **Zero-fill Right Shift (`a >>> b`)**

**Use Case: Handling Unsigned Integers / Bit Manipulation**

```js
let x = -8;
let y = x >>> 1; // 2147483644 (fills with zero from the left)

console.log((x >>> 0).toString(2)); // Get 32-bit unsigned binary representation
```

- Used when dealing with **binary data**, **unsigned bit fields**, or **encryption algorithms**.

---

### Summary Table

| Operator     | Common Use Cases |
|--------------|------------------|
| `&` AND       | Checking flags, permissions, masks |
| `|` OR        | Setting flags, combining options |
| `^` XOR       | Toggling bits, swapping values |
| `~` NOT       | Inverting bits, clever `indexOf` hacks |
| `<<` Left Shift  | Fast multiplication by powers of 2 |
| `>>` Right Shift | Signed division, preserving sign |
| `>>>` Zero-fill Right Shift | Treat signed numbers as unsigned, binary hacks |

