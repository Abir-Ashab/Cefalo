// Remainder (%) operator
let remainder = 12 % 5;
console.log("12 % 5 =", remainder); 

// Increment operator (++)
let x = 3;
console.log("\nInitial x =", x);
console.log("Prefix increment (++x) =", ++x); 
x = 3; // reset
console.log("Postfix increment (x++) =", x++); 
console.log("After postfix increment, x =", x); 

// Decrement operator (--)
x = 3;
console.log("\nInitial x =", x);
console.log("Prefix decrement (--x) =", --x); 
x = 3; // reset
console.log("Postfix decrement (x--) =", x--); 
console.log("After postfix decrement, x =", x); 

// Unary negation (-)
let y = 3;
console.log("\nUnary negation (-y):", -y);

// Unary plus (+)
console.log("\nUnary plus on string '+\"3\"':", +"3"); // 3
console.log("Unary plus on boolean '+true':", +true); // 1
console.log("Unary plus on boolean '+false':", +false); // 0
console.log("Unary plus on null '+null':", +null); // 0
console.log("Unary plus on undefined '+undefined':", +undefined); // NaN

// Exponentiation operator (**)
console.log("\nExponentiation 2 ** 3 =", 2 ** 3); // 8
console.log("Exponentiation 10 ** -1 =", 10 ** -1); // 0.1
