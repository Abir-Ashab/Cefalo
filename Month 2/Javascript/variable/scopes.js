// Global Scope Example
let globalVar = 'I am a global variable';

function showGlobalVar() {
  console.log(globalVar); // Can access globalVar inside the function
}

showGlobalVar(); // Output: I am a global variable
console.log(globalVar); // Output: I am a global variable


// Function Scope Example
function functionScope() {
  var functionVar = 'I am scoped to the function';
  console.log(functionVar); // Can access functionVar inside the function
}

functionScope(); // Output: I am scoped to the function
console.log(functionVar); // ReferenceError: functionVar is not defined


// Block Scope Example
if (true) {
  let blockVar = 'I am scoped to the block';
  const blockConst = 'I am also scoped to the block';
  console.log(blockVar); // Output: I am scoped to the block
  console.log(blockConst); // Output: I am also scoped to the block
}

console.log(blockVar); // Uncommenting this will throw ReferenceError: blockVar is not defined
console.log(blockConst); // Uncommenting this will throw ReferenceError: blockConst is not defined


// Block Scope with var Example
if (true) {
  var varInBlock = 'I am not scoped to the block';
}

console.log(varInBlock); // Output: I am not scoped to the block
