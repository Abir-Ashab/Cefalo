const bigNum1 = 9007199254740991;     // Number.MAX_SAFE_INTEGER
const bigNum2 = bigNum1 + 1;
const bigNum3 = bigNum1 + 2;

console.log(bigNum1); // 9007199254740991 
console.log(bigNum2); // 9007199254740992 
console.log(bigNum3); // 9007199254740992, Precision lost as it should be 9007199254740993

const bigInt1 = 9007199254740991n;
const bigInt2 = bigInt1 + 1n;
const bigInt3 = bigInt1 + 2n;

console.log(bigInt1); // 9007199254740991n
console.log(bigInt2); // 9007199254740992n
console.log(bigInt3); // 9007199254740993n
