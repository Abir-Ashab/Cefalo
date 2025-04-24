let a, b, rest;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20
[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(rest); // [30, 40, 50]
[a, b] = [10, 20, 30]; // rest is not used here, so can't access 3rd element

// destructuring in array
{
  const arr = [1, 2, 3];
  const [a, b, c] = arr; // a=1, b=2, c=3
}

// ignoring elements in array
{
  function f() {
    return [1, 2, 3];
  }

  const [a, , b] = f();
  console.log(a); // 1
  console.log(b); // 3
}

// destructuring in object
{
  const obj = { a: 1, b: 2, c: 3 };
  const { a, b, c } = obj; // Equivalent to: const a = obj.a, b = obj.b, c = obj.c;
}

// binding and assignment in object destructuring
{
  const obj = { a: 1, b: { c: 2 } };
  const {
    a: x,
    b: { c: d },
  } = obj;
  console.log(d); // 2
  console.log(x); // 1
  // x is bound to `a` and `d` is bound to `c` in the object
  {
    const { a } = obj; // a is constant
    let {
      b: { c: d },
    } = obj; // d is re-assignable
    console.log(d); // 2
  }

  {
    let [a, b, ...{ length }] = [1, 2, 3]; // we are doing "array_name.length" by {length} in destructuring, so its basically [3].length = 1
    console.log(a, b, length); // 1, 2, 1 ---> because length is an object property
    [a, b, ...length] = [1, 2, 3]; 
    console.log(a, b, length); // 1, 2, [3]
  }
}

// default values in object destructuring
// Default values are used when the property is undefined or not present in the object.
// If the property is null, the default value is not used.
{
  const [a = 1] = []; // a is 1
  const { b = 2 } = { b: undefined }; // b is 2
  const { c = 2 } = { c: null }; // c is null, so it is not assigned to 2
}
