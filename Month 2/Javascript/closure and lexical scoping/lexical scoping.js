function outer() {
  const x = 10;
  function inner() {
    console.log(x);
  }
  inner(); // has access to x because of lexical scoping
}
outer();

var a = "static";
function f1() {
  console.log(a);
}
function f2() {
  var a = "dynamic";
  f1(); // f1() is a closure that captures the variable a from the global scope
}
// f2();
console.dir(f1); // I can see the scope chain of f1 in browser console, not in the node console

