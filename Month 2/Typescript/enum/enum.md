### 1. Numeric Enums

This is the default in TypeScript. Each member is assigned a numeric value starting from 0 (unless you manually set a value).

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right
}

Direction.Up      // 0
Direction.Right   // 3
```

You can also manually assign values:

```ts
enum Direction {
  Up = 1,
  Down = 5,
  Left,
  Right
}

Direction.Left   // 6
Direction.Right  // 7
```

---

### 2. String Enums

Each member is assigned a **string literal** instead of a number. This is useful for readable and fixed string values.

```ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
```

You **must** assign a string value to every member.

---

### 3. Heterogeneous Enums

These enums mix **string and number** values. This is allowed, but generally discouraged because it can lead to confusion.

```ts
enum Response {
  No = 0,
  Yes = "YES"
}
```

---

### 4. Computed and Constant Enums

TypeScript evaluates enum members as either **constant** or **computed**.

```ts
enum FileAccess {
  None,               // 0
  Read = 1 << 1,      // 2
  Write = 1 << 2,     // 4
  ReadWrite = Read | Write, // 6
  G = "123".length    // 3 (computed)
}
```

- Constant: known at compile time
- Computed: evaluated from an expression

---

### 5. `const enum`

A `const enum` is completely **inlined at compile time**. It's faster and removes the generated JavaScript enum object.

```ts
const enum Direction {
  Up,
  Down,
  Left,
  Right
}

const move = Direction.Up;
```

After compilation, this becomes:

```js
const move = 0;
```

Note: You **cannot** use `const enum` if you’re compiling with `--isolatedModules`.

---

### Summary Table

| Type               | Values       | Notes                                        |
|--------------------|--------------|----------------------------------------------|
| Numeric Enum       | Numbers      | Default; auto-incremented or manual          |
| String Enum        | Strings      | Requires explicit assignment                 |
| Heterogeneous Enum | Mix          | Not recommended for clarity                  |
| Computed Enum      | Expressions  | Allows bitwise or expression-based values    |
| Const Enum         | Inlined      | Compile-time only, for performance           |
