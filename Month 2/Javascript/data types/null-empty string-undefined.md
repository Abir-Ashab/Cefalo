
## `undefined` vs `null` vs `""`

| Feature             | `undefined`                     | `null`                              | `""` (Empty String)         |
|--------------------|----------------------------------|-------------------------------------|-----------------------------|
| **Type**           | `undefined`                     | `object` (quirk!)                   | `string`                    |
| **Meaning**        | Value is **not assigned**       | Value is **intentionally empty**    | Value is an **empty string**|
| **Set by**         | JavaScript (by default)         | Developer (manually)               | Developer (manually)        |
| **Boolean value**  | `false`                         | `false`                             | `false`                     |
| **Example**        | `let x;`                        | `let x = null;`                     | `let x = "";`               |
| **Use in JSON**    | `undefined` is **skipped**      | Included as `null`                 | Included as `""`            |
| **Equality (`==`)**| `undefined == null` → `true`    | `null == undefined` → `true`       | Not equal to others         |
| **Strict (`===`)** | `undefined === null` → `false`  | `"" === null` → `false`            | `"" === undefined` → `false`|

### When to Use What?

| Scenario | Use |
|---------|-----|
| A variable hasn't been assigned yet | `undefined` (by default) |
| You want to reset or "clear" a variable value | `null` |
| You want an empty string but a valid text | `""` |
