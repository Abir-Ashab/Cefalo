

###  Your situation:

You have an async function:

```ts
async function fetchUser() {
  return {
    id: 1,
    name: "Alice",
    email: "alice@example.com"
  };
}
```

Now someone later changes it:

```ts
async function fetchUser() {
  return {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    age: 30 // New field
  };
}
```

---

###  Problem with manual typing

If you manually declared:

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

// Now you're missing `age` — leads to type bugs
```

This breaks silently unless you manually update every place.

---

### Your solution: Use `Awaited<ReturnType<typeof fetchUser>>`

```ts
type User = Awaited<ReturnType<typeof fetchUser>>;

function handleUser(user: User) {
  console.log(user.name, user.email, user.age); // All fields are available and type-safe
}
```

Now:
- If someone **adds or removes fields** in `fetchUser()`, `User` type updates **automatically**.
- No risk of type mismatches.
- Your app stays safe, scalable, and DRY.

---

### Yes — this is a textbook **good use case** of `Awaited<T>`.

Especially when:
- You want to use the return value of an async function in multiple places.
- The return shape might change over time.
- You want to avoid maintaining duplicate types manually.

