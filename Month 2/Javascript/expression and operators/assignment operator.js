function f() {
    // console.log("F!");
    return 2;
}
function g() {
    // console.log("G!");
    return 3;
}
let x, y;
  
y = x = f();
console.log(y);
y = [f(), x = g()];
console.log(y);
x[f()] = g();
console.log(x[2]); // undefined as x is not an array, but an object
x = [];
x[f()] = g(); // x[2] = 3
console.log(x[2]); // 3
