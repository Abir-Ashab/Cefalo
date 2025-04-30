### `string` vs `String`

- **`string`** (lowercase)
  - A **primitive type** used to represent text.
  - It's the standard and recommended type in **TypeScript** for string values.
  - Lightweight and efficient.
  - Example:
    ```ts
    let name: string = "Alice";
    ```

- **`String`** (uppercase)
  - A **constructor function** that creates a **String object**.
  - Not commonly used and **should be avoided** in TypeScript.
  - Creates an object instead of a primitive, which can lead to unexpected behavior.
  - Example:
    ```ts
    let name: String = new String("Alice"); // Not recommended
    ```

---

### `number` vs `Number`

- **`number`** (lowercase)
  - A **primitive type** for numeric values.
  - Used in **TypeScript** type annotations.
  - Preferred for all numeric operations.
  - Example:
    ```ts
    let age: number = 25;
    ```

- **`Number`** (uppercase)
  - A **constructor function** that creates a **Number object**.
  - Rarely needed and generally discouraged in both JS and TS.
  - Example:
    ```ts
    let age: Number = new Number(25); // Not recommended
    ```

---

### Why to Avoid `String` and `Number` Objects

- They create **objects**, not primitives.
- Can lead to **performance issues** and **comparison bugs**:
  ```ts
  let a = "hello";
  let b = new String("hello");

  console.log(a === b); // false
  ```

- **In TypeScript**, using `String` or `Number` as types allows object values like `new String("abc")`, which is not ideal.

---

### Best Practice

Always use **`string`** and **`number`** (lowercase) in TypeScript for variables and type annotations.

