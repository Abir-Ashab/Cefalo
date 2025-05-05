## `typeof` vs `instanceof` in TypeScript

Both `typeof` and `instanceof` are **type guards** in TypeScript. They help the compiler narrow down the type of a variable inside a conditional block, so you can safely access properties or methods specific to that type.

---

## `typeof`

### What it does:
- `typeof` checks the **primitive type** of a value at runtime.
- It is used for types like `string`, `number`, `boolean`, `undefined`, `symbol`, `bigint`, and `function`.

### Syntax:
```ts
typeof value === "type"
```

### Example:
```ts
function handleInput(input: string | number) {
  if (typeof input === "string") {
    // input is string here
    console.log(input.toUpperCase());
  } else {
    // input is number here
    console.log(input.toFixed(2));
  }
}
```

### Limitations:
- It does not work for custom classes or complex types like arrays or objects.
- For example, `typeof []` is `"object"`, and `typeof null` is also `"object"`, which can be misleading.

---

## `instanceof`

### What it does:
- `instanceof` checks whether a value is an **instance of a specific class or constructor function**.
- It is used for class-based or object-based types.

### Syntax:
```ts
value instanceof ClassName
```

### Example:
```ts
class Dog {
  bark() {
    console.log("Woof");
  }
}
class Cat {
  meow() {
    console.log("Meow");
  }
}

function speak(pet: Dog | Cat) {
  if (pet instanceof Dog) {
    // pet is Dog here
    pet.bark();
  } else {
    // pet is Cat here
    pet.meow();
  }
}
```

### Limitations:
- It only works with values that are created using classes or constructors.
- It does not work with primitive types.

---

## Summary

| Feature        | `typeof`                     | `instanceof`                     |
|----------------|------------------------------|----------------------------------|
| Works with     | Primitive types              | Class or constructor instances   |
| Returns        | A string (`"number"`, etc.)  | A boolean (`true` or `false`)    |
| Useful for     | Strings, numbers, etc.       | Objects created with `new`       |
| Example        | `typeof x === "string"`      | `x instanceof SomeClass`         |

---

**In short**:  
Use `typeof` when you're dealing with **primitive types**, and use `instanceof` when you're checking **class-based objects**.