let i = 0;

while (i < 6) {
  if (i === 3) {
    break;
  }
  i = i + 1;
}
console.log(i);
// Expected output: 3


outerBlock: { // outerBlock is a label
    innerBlock: { // innerBlock is a label
      console.log("inside innerBlock");
      break outerBlock; // breaks out of both innerBlock and outerBlock
      console.log(":-("); // skipped
    }
    console.log("2"); // skipped
}
outerBlock: {
    innerBlock: {
      console.log("1");
      break innerBlock; // breaks out of both innerBlock and outerBlock
      console.log(":-("); // skipped
    }
    console.log("outside innerBlock"); // executed
}
  