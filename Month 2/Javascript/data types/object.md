# JavaScript Objects – Detailed Explanation

## 1. Creating an Object Using Object Literal Syntax

```javascript
const Animal = {
    type: "Invertebrates", // Default value of properties
    displayType() {
      // Method that displays the type of animal using 'this'
      console.log(this.type);
    },
};
```

- We define an `Animal` object with a default `type` and a method `displayType()` to log the type.
- The `this` keyword refers to the object on which the method is called.

---

## 2. Creating New Objects from a Prototype

```javascript
const animal1 = Object.create(Animal);
animal1.displayType(); // Logs: Invertebrates
```

- `Object.create()` creates a new object with `Animal` as its prototype.
- Since `animal1` doesn't override `type`, it inherits `type` from `Animal`.

```javascript
const fish = Object.create(Animal);
fish.type = "Fishes"; // Overrides the inherited type property
fish.displayType(); // Logs: Fishes
```

- `fish` is created from `Animal` too, but overrides the `type` property with "Fishes".

---

## 3. Creating an Object with Static Properties

```javascript
const myCar = {
    make: "Ford",
    model: "Mustang",
    year: 1969,
};
```

- Simple object creation using literal syntax with 3 properties: `make`, `model`, and `year`.

---

## 4. Dynamically Adding Properties with Various Key Types

```javascript
const myObj = {};
const str = "myString";
const rand = Math.random();
const anotherObj = {};
```

```javascript
myObj.type = "Dot syntax for a key named type"; // Uses dot notation
myObj["date created"] = "This key has a space"; // Bracket notation needed for space
myObj[str] = "This key is in variable str"; // Key from variable
myObj[rand] = "A random number is the key here"; // Key is a number
myObj[anotherObj] = "This key is object anotherObj"; // Key is an object (converted to string '[object Object]')
myObj[""] = "This key is an empty string"; // Empty string as key
```

- Dot notation is used for keys that are valid identifiers.
- Bracket notation allows you to use:
  - Keys with spaces
  - Variables as keys
  - Random numbers or even objects (which get converted to strings)

```javascript
console.log(myObj[""]);
```

- Logs the value stored under the empty string key.

```javascript
// console.log(myObj."date created"); // ❌ Syntax error due to space
console.log(myObj["date created"]); // ✅ Correct way using bracket notation
```

---

## 5. Accessing and Modifying Properties

```javascript
myCar.make = "Ford"; // Dot notation
myCar.model = "Mustang";
myCar.year = 1969;

myCar["make"] = "Ford"; // Bracket notation does the same
myCar["model"] = "Mustang";
myCar["year"] = 1969;
```

- You can use either dot or bracket notation to read or write properties.
- Use bracket notation when key is dynamic or not a valid identifier.

---

## 6. Deleting Object Properties

```javascript
const checkDelete = {}
checkDelete.a = 5;
checkDelete.b = 12;

delete checkDelete.a;
console.log("a" in checkDelete); // false
```

- `delete` removes a property from an object.
- `"a" in checkDelete` checks if the property `a` exists in the object (returns `false` after deletion).

---

## 7. Getter and Setter Methods

```javascript
const check_getter_setter = {
    a: 7,
    get b() {
      return this.a + 1;
    },
    set c(x) {
      this.a = x / 2;
    },
};
```

- `get` defines a **computed property** `b`, which returns `a + 1`.
- `set` defines a **setter** for `c`, which sets `a` to half of the value passed in.

```javascript
console.log(check_getter_setter.a); // 7
console.log(check_getter_setter.b); // 8 (getter adds 1 to a)
check_getter_setter.c = 50;         // Calls setter, sets a = 25
console.log(check_getter_setter.a); // 25
```

---

## 8. Comparing Objects

```javascript
const fruit = { name: "apple" };
const anotherFruit = { name: "apple" };

let comparison = (fruit == anotherFruit); 
console.log(comparison); // false
```

- Even though both objects have identical content, they are **not equal**.
- Objects are compared by **reference**, not by content.
- `fruit` and `anotherFruit` point to different locations in memory.

But replacing the value of fruit with anotherFruit results in true.

```javascript
anotherFruit = fruit; // now both variables point to the same object in memory
comparison = (fruit == anotherFruit);
console.log(comparison); // true, because they are now the same object in memory
```

# Built-in Objects in JavaScript

Built-in objects, also known as **global objects**, are provided by the JavaScript language itself. They are accessible in the global scope and offer fundamental functionality for working with numbers, strings, dates, mathematical operations, and more.

Below are some of the commonly used built-in objects:

---

## 1. Number
Represents and allows operations on numeric values like converting string to number

```javascript
const num = 42;
console.log(typeof num); // 'number'
console.log(Number("123")); // 123
```

---

## 2. Math
Provides mathematical constants and functions.

```javascript
console.log(Math.PI); // 3.141592653589793
console.log(Math.sqrt(64)); // 8
console.log(Math.random()); // Random number between 0 and 1
```

---

## 3. Date
Represents dates and times.

```javascript
const now = new Date();
console.log(now.toString());
console.log(now.getFullYear());
```

---

## 4. String
Used for working with text.

```javascript
const message = "Hello, JavaScript!";
console.log(message.length); // 18
console.log(message.toUpperCase()); // 'HELLO, JAVASCRIPT!'
```

---

## 5. Function
Used to create new function objects.

```javascript
const sum = new Function('a', 'b', 'return a + b');
console.log(sum(5, 10)); // 15
```

---

## 6. Error
Used for handling exceptions.

```javascript
try {
  throw new Error("Something went wrong!");
} catch (err) {
  console.log(err.message); // 'Something went wrong!'
}
```

---

## 7. Boolean
Represents a logical entity and can have two values: `true` or `false`.

```javascript
const isJavaScriptFun = true;
console.log(typeof isJavaScriptFun); // 'boolean'
console.log(Boolean(0)); // false
console.log(Boolean("hello")); // true
```


