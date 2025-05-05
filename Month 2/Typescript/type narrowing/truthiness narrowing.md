**Truthiness narrowing** in TypeScript is a feature where the type of a variable is made more specific based on whether it is "truthy" or "falsy" in an `if` condition or similar control flow.

### What does "truthy" or "falsy" mean?

In JavaScript, values are considered either **truthy** (evaluate to true in a boolean context) or **falsy** (evaluate to false). For example:

**Falsy values include:**
- `false`
- `0`
- `''` (empty string)
- `null`
- `undefined`
- `NaN`

Everything else is considered **truthy**.

### How TypeScript uses truthiness

If a variable has a union type like `string | undefined`, and you check `if (value)`, TypeScript will assume that inside the `if` block, the variable is **not** undefined, because `undefined` is falsy.

#### Example:

```ts
function printName(name?: string) {
  if (name) {
    // Here, name is narrowed to 'string'
    console.log(name.toUpperCase());
  } else {
    // Here, name is 'undefined'
    console.log("No name provided");
  }
}
```

### Important point: Not all falsy values are null or undefined

Consider this example:

```ts
function double(value: number | null) {
  if (value) {
    return value * 2;
  }
  return 0;
}
```

This will skip over `0` because `0` is a falsy value, even though it’s a valid number. If you want to include `0` as a valid input, you should check for `null` directly:

```ts
function double(value: number | null) {
  if (value !== null) {
    return value * 2;
  }
  return 0;
}
```

### Summary

- Truthiness narrowing is based on how JavaScript evaluates values in conditions.
- TypeScript removes `null`, `undefined`, or other falsy types when it sees a truthy check.
- Be cautious when using truthiness narrowing with values like `0`, `false`, or empty strings, because they are valid values but still falsy.

Would you like a few examples involving arrays or real-world functions?