const n1 = null ?? 1; // 1
const n2 = undefined ?? 2; // 2
const n3 = false ?? 3; // false
const n4 = 0 ?? 4; // 0

// "expr1 ?? expr2" : Returns expr1 if it is neither null nor undefined; otherwise, returns expr2.