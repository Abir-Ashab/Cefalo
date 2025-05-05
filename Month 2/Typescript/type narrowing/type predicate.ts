// type predicate separates checking logic from your main function, which makes the code cleaner and reusable.
// It ret
function isString(value: unknown) : value is string {
    return typeof value === 'string';
}

function main(x: unknown) {
    if (isString(x)) { 
      x.toUpperCase();
      console.log("Hi", x);  //
    } else {
      console.log(x);
    }
}

main(123); // Output: HELLO