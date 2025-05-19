function testDebug() {
  const a = 5;
  const b = 10;
  debugger; // Execution pauses here
  const c = a + b;
  console.log(c);
}
testDebug();
