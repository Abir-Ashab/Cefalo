# 📄 JavaScript Array Methods Documentation

This document provides an organized explanation of various JavaScript array methods and operations with clear examples and detailed descriptions.

---

## Basic Array Manipulation

```js
let myArray = ["1", "2", "3"];
myArray = myArray.concat("a", "b", "c"); // ["1", "2", "3", "a", "b", "c"]
```

**`concat()`** creates a new array by merging the existing array with new values.

```js
const list = myArray.join(" - "); // "1 - 2 - 3 - a - b - c"
```

**`join()`** joins all elements into a string, separated by a specified separator.

```js
myArray.push("3"); // Adds "3" at the end
myArray.pop(); // Removes the last element
myArray.shift(); // Removes the first element
myArray.unshift("0"); // Adds "0" at the start
```

These methods are used to **add/remove elements** from either end of the array.

---

## Splice and Slice

```js
myArray.splice(1, 2); // Removes 2 elements starting at index 1
myArray.splice(1, 0, "x", "y"); // Inserts "x", "y" at index 1
```

**`splice(start, deleteCount, ...items)`** can add, remove, or replace elements.

```js
myArray.reverse(); // Reverses the array in place
myArray.sort(); // Sorts the array elements as strings
```

```js
myArray = myArray.slice(1, 4); // Returns elements from index 1 to 3
myArray = myArray.slice(-2); // Returns the last 2 elements
myArray = myArray.slice(1); // Returns elements from index 1 to the end
```

**`slice(start, end)`** returns a shallow copy of a portion of the array.

---

## Flattening Arrays

```js
myArray = [1, 2, [3, 4]];
myArray = myArray.flat(); // [1, 2, 3, 4]
```

**`flat()`** creates a new array with sub-array elements concatenated.

---

## Custom Sorting

```js
myArray = ["Wind", "Rain", "Fire"];
myArray.sort(); // ["Fire", "Rain", "Wind"]
```

```js
const sortFn = (a, b) => {
  if (a[a.length - 1] < b[b.length - 1]) return -1;
  if (a[a.length - 1] > b[b.length - 1]) return 1;
  return 0;
};
myArray.sort(sortFn); // ["Wind","Fire","Rain"]
```

**Custom sort functions** let you define how array elements should be compared.

---

## Searching in Arrays

```js
const a = ["a", "b", "a", "b", "a"];
console.log(a.indexOf("b")); // 1
console.log(a.indexOf("b", 2)); // 3
console.log(a.indexOf("z")); // -1
```

```js
console.log(a.lastIndexOf("b")); // 3
console.log(a.lastIndexOf("b", 4)); // 3
console.log(a.lastIndexOf("b", 2)); // 1
console.log(a.lastIndexOf("z")); // -1
```

- **`indexOf()`**: Finds the first occurrence.
- **`lastIndexOf()`**: Finds the last occurrence.

---

## Iteration Methods

```js
a.forEach((element) => {
  console.log(element);
});
```

**`forEach()`** executes a function for each element.

```js
let a1 = ["a", "b", "c"];
let a2 = a1.map((item) => item.toUpperCase());
console.log(a2); // ['A', 'B', 'C']
```

**`map()`** transforms every element and returns a new array.

```js
a2 = a1.flatMap((item) => [item.toUpperCase(), item.toLowerCase()]);
console.log(a2); // ['A', 'a', 'B', 'b', 'C', 'c']
```

**`flatMap()`** maps and flattens the result in one go.

---

## Filtering and Finding Elements

```js
a1 = ["a", 10, "b", 20, "c", 30];
a2 = a1.filter((item) => typeof item === "number");
console.log(a2); // [10, 20, 30]
```

**`filter()`** returns items that match a condition.

```js
let i = a1.find((item) => typeof item === "number");
console.log(i); // 10
```

```js
i = a1.findLast((item) => typeof item === "number");
console.log(i); // 30
```

```js
i = a1.findIndex((item) => typeof item === "number");
console.log(i); // 1
```

```js
i = a1.findLastIndex((item) => typeof item === "number");
console.log(i); // 5
```

- **`find()` / `findLast()`**: Finds first/last value matching the condition.
- **`findIndex()` / `findLastIndex()`**: Finds first/last index matching the condition.

---

## `every()` and `some()` Checks

```js
function isNumber(value) {
  return typeof value === "number";
}
console.log([1, 2, 3].every(isNumber)); // true
console.log([1, "2", 3].every(isNumber)); // false
```

**`every()`** checks if all items pass the condition.

```js
console.log([1, 2, 3].some(isNumber)); // true
console.log(["1", "2", "3"].some(isNumber)); // false
```

**`some()`** checks if at least one item passes the condition.

---

## Reducing Arrays

```js
let a = [10, 20, 30];
let total = a.reduce((acc, curr) => acc + curr, 0);
console.log(total); // 60
```

**`reduce()`** accumulates array values into a single value.

---

## Grouping Array Elements

```js
const inventory = [
  { name: "asparagus", type: "vegetables" },
  { name: "bananas", type: "fruit" },
  { name: "goat", type: "meat" },
  { name: "cherries", type: "fruit" },
  { name: "fish", type: "meat" },
];

const result = Object.groupBy(inventory, ({ type }) => type);
console.log(result);
```

**`Object.groupBy()`** groups array items into an object based on a callback function.  
Result:
```js
{
  vegetables: [{ name: "asparagus", type: "vegetables" }],
  fruit: [{ name: "bananas", type: "fruit" }, { name: "cherries", type: "fruit" }],
  meat: [{ name: "goat", type: "meat" }, { name: "fish", type: "meat" }]
}
```
