// normal function
function addTogether() {
  var x = 20;
  var y = 20;
  var answer = x + y;
  console.log(answer);
};
addTogether(); // 40

// function without function name - IIFE (Immediately Invoked Function Expression)
(function () {
  var x = 20;
  var y = 20;
  var answer = x + y;
  console.log(answer);
});

// Now we need a way to call this function without using the function name. We can do this by wrapping the function in parentheses and then adding another set of parentheses at the end to call it immediately.
(function () {
  var x = 20;
  var y = 20;
  var answer = x + y;
  console.log(answer);
})(); // 40

( async() => {
    
  const x = 1;
  const y = 9;

  console.log(`Hello, The Answer is ${x+y}`);

})();