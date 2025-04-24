function counter() {
    let count = 0;
    const counting = function counting() {
      count++;
      return count;
    };
    return counting
}
  
const inc = counter(); // counter is returning the function counting by scoping count with counting function
console.log(inc()); // 1
console.log(inc()); // 2
console.log(counting()); // ReferenceError: counting is not defined


// Function scope is required to create closures, which allow a function to "remember" variables from the scope it was created in — and that scope has to be a function, not just a block.