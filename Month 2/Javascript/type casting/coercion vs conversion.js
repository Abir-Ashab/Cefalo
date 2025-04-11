// Type coercion is the automatic or implicit conversion of values from one data type to another (such as strings to numbers). Type conversion is similar to type coercion because they both convert values from one data type to another with one key difference — type coercion is implicit whereas type conversion can be either implicit or explicit.

const value1 = "5";
const value2 = 9;
let sum = value1 + value2; // 59 - type coercion(happen only implicitely)

console.log(sum); // JS had a choice between a string or a number and decided to use a string. (implicitely)


sum = Number(value1) + value2; // 14 - type conversion (happen both explicitely ands implicitely)