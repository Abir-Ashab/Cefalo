# Function Borrowing in JavaScript

Function borrowing allows an object to use a method defined in another object **without duplicating** that method. This is useful when two or more objects share similar structure or data, but you don't want to use classical inheritance or copy methods unnecessarily.

JavaScript provides three methods for this purpose:

- `.call()`
- `.apply()`
- `.bind()`

All three allow you to explicitly set the value of `this` in a function — effectively "borrowing" the method for use with another object.

---

## Example Setup

```js
class Dog {
  constructor(name, breed, age) {
    this.name = name;
    this.breed = breed;
    this.age = age;
  }

  tellUsAboutYourSelf(...mood) {
    return `My name is ${this.name}. I am a ${this.breed}, I am ${this.age} years old, and I feel ${mood[0]}.` ${mood[1]}; 
  }
}

const fido = new Dog("Fido", "Labrador", 4);

const sparkles = {
  name: "Sparkles",
  breed: "Siamese",
  age: 5
};
```

In this example, `fido` has access to the method `tellUsAboutYourSelf`, but `sparkles` does not. We will use function borrowing to let `sparkles` use `fido`'s method.

---

## `.call()`

```js
fido.tellUsAboutYourSelf.call(sparkles, "happy", "sad");
```

### Explanation:
- Executes the function **immediately**.
- The first argument is the value to use as `this` (in this case, `sparkles`).
- Remaining arguments are passed **individually**.

### Output:
```
"My name is Sparkles. I am a Siamese, I am 5 years old, and I feel happy."
```

---

## `.apply()`

```js
fido.tellUsAboutYourSelf.apply(sparkles, ["excited"]);
```

### Explanation:
- Executes the function **immediately**.
- The first argument is the value to use as `this`.
- The second argument is an **array** of parameters to pass into the function.

### Output:
```
"My name is Sparkles. I am a Siamese, I am 5 years old, and I feel excited."
```

---

## `.bind()`

```js
const describeSparkles = fido.tellUsAboutYourSelf.bind(sparkles, "curious");
describeSparkles();
```

### Explanation:
- Returns a **new function** where `this` is permanently set to the provided object (`sparkles`).
- You can also **pre-fill arguments** (partial application).
- The returned function can be called **later**.

### Output:
```
"My name is Sparkles. I am a Siamese, I am 5 years old, and I feel curious."
```

You can also bind without arguments and pass them later:

```js
const describeLater = fido.tellUsAboutYourSelf.bind(sparkles);
describeLater("tired");
```

### Output:
```
"My name is Sparkles. I am a Siamese, I am 5 years old, and I feel tired."
```

---

## Summary Table

| Method     | Executes Immediately? | How Parameters Are Passed        | Returns a New Function? |
|------------|------------------------|----------------------------------|--------------------------|
| `.call()`  | Yes                    | As comma-separated values        | No                       |
| `.apply()` | Yes                    | As a single array                | No                       |
| `.bind()`  | No                     | Can be passed during bind or call| Yes                      |

---

## Why Use Function Borrowing?

- Avoids code duplication by reusing methods across objects.
- Eliminates unnecessary inheritance when you only need a single method.
- Provides flexibility to share functionality across unrelated objects.
- Useful for handling "array-like" objects such as `arguments`, `NodeList`, etc.

Example with `arguments`:

```js
function findO() {
  const args = Array.prototype.slice.call(arguments);
  return args.filter(str => str.includes("o"));
}

findO("cat", "dog", "mouse", "bird"); // ["dog", "mouse"]
```

Here, we **borrowed** the `Array.prototype.slice` method to convert the `arguments` object into a real array.
