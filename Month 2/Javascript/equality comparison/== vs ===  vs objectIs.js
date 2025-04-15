// == 
console.log(1 == 1n); // true
// === 
console.log(1 === 1n); // false, because it matches the type



// object.is() is a method that determines whether two values are the same value. It is similar to the strict equality operator (===), but it has some differences in how it handles certain special cases(2)

// Case 1: Signed zero
console.log(0 === -0); // true
console.log(+0 === -0); // true
console.log(-0 === -0); // true

Object.is(0, -0); // false
Object.is(+0, -0); // false
Object.is(-0, -0); // true

// Case 2: NaN
console.log(NaN === NaN); // false, because NaN is not equal to itself as it is not a specific number
console.log(0 / 0 === NaN); // false, because NaN is not equal to itself 

Object.is(NaN, 0 / 0); // true
Object.is(NaN, Number.NaN); // true
