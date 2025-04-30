// pass by value
let a = 10;
function change(x) {
  x = 20;
}
change(a);
console.log(a); // Output: 10

// pass by reference
let obj = { name: "Alice" };
function modify(o) {
  o.name = "Bob";
}

modify(obj);
console.log(obj.name); // Output: "Bob"
