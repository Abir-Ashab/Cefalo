// example-1
// function scope
function counter() {
    let count = 0;
    return function () {
      count++;
      return count;
    };
}
  
const inc = counter();
console.log(inc()); // 1
console.log(inc()); // 2
// Function scope is required to create closures, which allow a function to "remember" variables from the scope it was created in — and that scope has to be a function, not just a block.


// Block scope
{
    let count = 0;
    const inc = function () {
      count++;
      return count;
    };
}
// console.log(inc()); // ReferenceError: inc is not defined


// example-2
// function scope
const obj = {
  value: 42,
  getValue: function () {
    return this.value; // "this" refers to obj
  }
};

// block scope
const objj = {
  value: 42,
  getValue: function () {
    {
      // This is a block scope
      return this.value; // `this` no longer refers to `objj`, it refers to the global objject (or undefined in strict mode)
    }
  }
};

console.log(objj.getValue()); // undefined or throws error (in strict mode)
