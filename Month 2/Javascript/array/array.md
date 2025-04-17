# JavaScript Array Behavior and Operations

## Mixed Type Array
```js
let arr = [
  "Apple",
  { name: "John" }, // object
  true,              // boolean
  function () {      // function
    console.log("hello");
  },
];
console.log(arr.length); // 4
console.log(arr[1].name); // John
arr[3](); // hello
```

## Basic Array Operations
```js
let fruits = ["Apple", "Orange", "Plum"];

console.log(fruits.at(-1)); // Plum

fruits.pop(); // removes "Plum"
fruits.push("Pear"); // adds "Pear" to the end
fruits.shift(); // removes "Apple"
fruits.unshift("Apple"); // adds "Apple" back to the start
```

## Adding Multiple Elements
```js
let fruit = ["Apple"];
fruit.push("Orange", "Peach");
fruit.unshift("Pineapple", "Lemon");
console.log(fruit); // ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
```

## Arrays are Also Objects
```js
let numbers = [];
numbers.name = "niloy";
numbers[9] = 5;
numbers.age = 25;
numbers[10] = { age: 25 };

console.log(numbers["age"]); // 25
// console.log(numbers[10].age); // would log 25

console.log(numbers.length); // 11
```

## Iterating Numeric Elements Only
```js
for (let index = 0; index < numbers.length; index++) {
  const element = numbers[index];
  console.log(element);
}
```

## Iterating All Keys (including custom ones)
```js
for (let key in numbers) {
  console.log(`${key}: ${numbers[key]}`);
}
```

## Full Structure
```js
console.log(numbers);
```
