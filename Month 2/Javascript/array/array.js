// mixed array
let arr = [
  "Apple",
  { name: "John" },
  true,
  function () {
    console.log("hello");
  },
];
console.log(arr.length); // 4, the length of the array
console.log(arr[1].name); // John
arr[3](); // hello

let fruits = ["Apple", "Orange", "Plum"];
console.log(fruits.at(-1)); // same as fruits[i], if i >= -1 or fruits[fruits.length-1]
fruits.pop(); // remove "Pear"
fruits.push("Pear"); // Add Pear at the end of the array
fruits.shift(); // remove Apple from the beginning of the array
fruits.unshift("Apple"); // Add Apple at the beginning of the array

let fruit = ["Apple"];
fruit.push("Orange", "Peach");
fruit.unshift("Pineapple", "Lemon");
console.log(fruits); // ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]

let numbers = []; // make an array
numbers.name = "niloy"; // assign a property to the array as like object, not an index, rather at the end of the array
numbers[9] = 5; // assign a property with the index far greater than its length
numbers.age = 25; // simply adding a normal object property to the array as like object, not an index, rather at the end of the array
numbers[10] = { age: 25 }; // assigning an object to the array at index 10
console.log(numbers["age"]); // 25
// console.log(numbers[10].age);

console.log(numbers.length); // 10, the object is ignored

for (let index = 0; index < numbers.length; index++) {
  const element = numbers[index];
  console.log(element);
}

for (let key in numbers) {
  console.log(`${key}: ${numbers[key]}`);
}
console.log(numbers);
