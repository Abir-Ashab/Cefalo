## 1. Basic Example: String Keys vs Symbol Keys in an Object

```js
let lib = {
    name: "ABC",
};

lib["id"] = 5;
lib["id"] = 6; // The value is changed because it is a String KEY!

lib[Symbol("id")] = 123;
lib[Symbol("id")] = 124; // Not changed

console.log(lib); 
// Output:
// { name: "ABC", id: 6, Symbol(id): 123, Symbol(id): 124 }
```

**Explanation:**

- When using string keys (e.g., `"id"`), assigning a new value overwrites the previous one.
- When using `Symbol("id")`, each call creates a new unique symbol.
- Both `123` and `124` are stored under different symbol keys, even though the descriptions are the same.

---

## 2. Working with Symbols

```js
let id = Symbol("id");

alert(id); 
// Throws: TypeError: Cannot convert a Symbol value to a string

alert(id.toString()); 
// Output: Symbol(id)

alert(id.description); 
// Output: id
```

**Explanation:**

- You cannot directly alert or concatenate a symbol with strings.
- Use `toString()` or access the `description` to make it readable.

---

## 3. Symbols as Object Property Keys

```js
let user = {
    name: "John",
    [id]: 123 // using a symbol as a property key
};
```

**Explanation:**

- The key `[id]` is a symbol, not a string.
- It avoids key collisions with existing or future string properties.

---

## 4. Enumerating Object Properties

```js
for (let key in user) alert(key); 
// Only outputs: "name"
```

**Explanation:**

- Symbol-keyed properties are not included in `for...in` loops.
- This allows symbols to be used as hidden/non-enumerable keys.

---

## 5. Accessing Symbol Properties Directly

```js
alert("Direct: " + user[id]); 
// Output: Direct: 123
```

**Explanation:**

- You can directly access a symbol-keyed property using the exact symbol reference.

---

## 6. Global Symbols: Shared Across the Codebase

```js
let globalSym = Symbol.for("id"); 
let idAgain = Symbol.for("id"); 

alert(globalSym === idAgain); 
// Output: true
```

**Explanation:**

- `Symbol.for("key")` checks the global registry and returns the same symbol if it already exists.
- Useful for sharing symbols across modules or files.

---

## 7. Retrieving Global Symbol Keys

```js
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

alert(Symbol.keyFor(sym)); 
// Output: name

alert(Symbol.keyFor(sym2)); 
// Output: id
```

**Explanation:**

- `Symbol.keyFor(symbol)` returns the registry key associated with a global symbol.

---

## 8. Global vs Local Symbols

```js
let globalSymbol = Symbol.for("name"); // Global symbol
let localSymbol = Symbol("name");      // Local symbol

alert(Symbol.keyFor(globalSymbol)); 
// Output: name

alert(Symbol.keyFor(localSymbol)); 
// Output: undefined
```

**Explanation:**

- Global symbols can be looked up using `Symbol.keyFor`.
- Local symbols created with `Symbol()` are not in the registry and can't be retrieved this way.

