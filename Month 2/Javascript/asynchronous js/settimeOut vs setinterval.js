// setTimeout is used to execute a function after a specified delay
console.log("Start");
setTimeout(() => {
  console.log("Executed after 2 seconds");
}, 2000);
console.log("End");

// setTimeout returns a timeout ID when it is created
const timeoutId = setTimeout(() => {
  console.log("This will NOT run"); // This will not run because we are clearing the timeout before it executes
}, 3000);
clearTimeout(timeoutId);

// setInterval is used to execute a function repeatedly at specified intervals, it returns an interval ID when it is created
let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(`Interval count: ${count}`);
  if (count === 5) clearInterval(intervalId);
}, 1000);
