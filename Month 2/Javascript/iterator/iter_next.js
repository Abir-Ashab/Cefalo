var nums = [1, 5, 16];

var iter = nums[Symbol.iterator]();

console.log(iter.next()); // {value: 1, done: false}
console.log(iter.next()); // {value: 5, done: false}
console.log(iter.next()); // {value: 16, done: false}   
console.log(iter.next()); // {value: undefined, done: true}
