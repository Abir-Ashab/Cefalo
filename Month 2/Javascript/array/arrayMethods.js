let myArray = ["1", "2", "3"];
myArray = myArray.concat("a", "b", "c"); // ["1", "2", "3", "a", "b", "c"]
const list = myArray.join(" - "); // "1 - 2 - 3 - a - b - c"
myArray.push("3"); // ["1", "2", "3", "a", "b", "c", "3"]
myArray.pop(); // ["1", "2", "3", "a", "b", "c"]
myArray.shift(); // ["2", "3", "a", "b", "c"]
myArray.unshift("0"); // ["0", "2", "3", "a", "b", "c"]
myArray.splice(1, 2); // ["0", "a", "b", "c"]
myArray.splice(1, 0, "x", "y"); // ["0", "x", "y", "a", "b", "c"]
myArray.reverse(); // ["c", "b", "a", "y", "x", "0"]
myArray.sort(); // ["0", "a", "b", "c", "x", "y"]
myArray = myArray.slice(1, 4); // ["a", "b", "c"]
myArray = myArray.slice(-2); // ["b", "c"] --> '-' Starts index is -2 (counting from the end of the array), there is no end index, so it goes to the end of the array
myArray = myArray.slice(1); // ["c"] --> Starts index is 1 (counting from the beginning of the array), there is no end index, so it goes to the end of the array

myArray = [1, 2, [3, 4]];
myArray = myArray.flat(); // myArray is now [1, 2, 3, 4], since the [3, 4] subarray is flattened

myArray = ["Wind", "Rain", "Fire"];
myArray.sort(); // sorts the array so that myArray = ["Fire", "Rain", "Wind"]

const sortFn = (a, b) => {
    if (a[a.length - 1] < b[b.length - 1]) {
      return -1; // Negative number => a < b, a comes before b
    } else if (a[a.length - 1] > b[b.length - 1]) {
      return 1; // Positive number => a > b, a comes after b
    }
    return 0; // Zero => a = b, a and b keep their original order
  };
  myArray.sort(sortFn); // sorts the array so that myArray = ["Wind","Fire","Rain"]
  

const a = ["a", "b", "a", "b", "a"];
console.log(a.indexOf("b")); // 1
console.log(a.indexOf("b", 2)); // 3 but not 1, because the search starts at index 2
console.log(a.indexOf("z")); // -1, because 'z' was not found

console.log(a.lastIndexOf("b")); // 3, the last occurrence of "b"
console.log(a.lastIndexOf("b", 4)); // 3, the last occurrence of "b" before index 4
console.log(a.lastIndexOf("b", 2)); // 1, the last occurrence of "b" before index 2
console.log(a.lastIndexOf("z")); // -1

a.forEach((element) => {
    console.log(element);
});

let a1 = ["a", "b", "c"];
let a2 = a1.map((item) => item.toUpperCase()); // map returns value from executing callback on every array item.
console.log(a2); // ['A', 'B', 'C']

a1 = ["a", "b", "c"];
a2 = a1.flatMap((item) => [item.toUpperCase(), item.toLowerCase()]); // flatMap returns value from executing callback on every array item and flattens the result into a new array.
console.log(a2); // ['A', 'a', 'B', 'b', 'C', 'c']

a1 = ["a", 10, "b", 20, "c", 30];
a2 = a1.filter((item) => typeof item === "number"); // filter returns a new array with all elements that pass the test implemented by the provided function.
console.log(a2); // [10, 20, 30]

let i = a1.find((item) => typeof item === "number"); // find returns the value of the first element in the array that satisfies the provided testing function.
console.log(i); // 10

i = a1.findLast((item) => typeof item === "number"); // findLast returns the value of the last element in the array that satisfies the provided testing function.
console.log(i); // 30

i = a1.findIndex((item) => typeof item === "number"); // findIndex returns the index of the first element in the array that satisfies the provided testing function.
console.log(i); // 1

i = a1.findLastIndex((item) => typeof item === "number"); // findLastIndex returns the index of the last element in the array that satisfies the provided testing function.
console.log(i); // 5


{
    function isNumber(value) {
        return typeof value === "number";
    }
    let a1 = [1, 2, 3];
    console.log(a1.every(isNumber)); // true --> The every() method returns true if callback returns true for every item in the array
    let a2 = [1, "2", 3];
    console.log(a2.every(isNumber)); // false
      
}

{
    function isNumber(value) {
        return typeof value === "number";
    }
    // The some() method returns true if callback returns true for at least one item in the array.
    let a1 = [1, 2, 3];
    console.log(a1.some(isNumber)); // true
    let a2 = [1, "2", 3];
    console.log(a2.some(isNumber)); // true
    let a3 = ["1", "2", "3"];
    console.log(a3.some(isNumber)); // false
}

{
    let a = [10, 20, 30];
    let total = a.reduce(
    (accumulator, currentValue) => accumulator + currentValue, 0); // here 0 is the initial value of accumulator, then the first value of the array is added to it, and so on.
    console.log(total); 
}

// groupBy method works by taking an array and a callback function as arguments. It iterates over each element in the array, applies the callback function to it, and groups the elements based on the return value of the callback function. The result is an object where the keys are the return values of the callback function and the values are arrays of elements that correspond to those keys.
const inventory = [
    { name: "asparagus", type: "vegetables" },
    { name: "bananas", type: "fruit" },
    { name: "goat", type: "meat" },
    { name: "cherries", type: "fruit" },
    { name: "fish", type: "meat" },
];
const result = Object.groupBy(inventory, ({ type }) => type);
console.log(result);