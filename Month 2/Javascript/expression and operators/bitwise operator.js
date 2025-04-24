let a = 5;      // binary: 00000000000000000000000000000101
let b = 3;      // binary: 00000000000000000000000000000011

// Bitwise AND
let andResult = a & b;  // 00000000000000000000000000000001
console.log("\nBitwise AND (a & b):", andResult); // 1

// Bitwise OR
let orResult = a | b;   // 00000000000000000000000000000111
console.log("Bitwise OR (a | b):", orResult); // 7

// Bitwise XOR
let xorResult = a ^ b;  // 00000000000000000000000000000110
console.log("Bitwise XOR (a ^ b):", xorResult); // 6

// Bitwise NOT
let notResult = ~a;     // Inverts all bits (two's complement)
console.log("Bitwise NOT (~a):", notResult); // -6

// Left Shift
let leftShift = a << 2; // 00000000000000000000000000010100
console.log("Left Shift (a << 2):", leftShift); // 20

// Sign-propagating Right Shift
let rightShift = a >> 1; // 00000000000000000000000000000010
console.log("Right Shift (a >> 1):", rightShift); // 2

// Zero-fill Right Shift
let zeroFillShift = a >>> 1; // Same result for positive numbers
console.log("Zero-fill Right Shift (a >>> 1):", zeroFillShift); // 2

// Negative number shift for comparison
let neg = -5;
console.log("Sign-propagating right shift (-5 >> 1):", neg >> 1);  // -3
console.log("Zero-fill right shift (-5 >>> 1):", neg >>> 1);       // 2147483645
