// try...catch only works for runtime errors

try {
    // {{{{{{{{{{{{ .....If I comment out this line, it won't run due to syntax error, because the code is not valid.try...catch can only handle errors that occur in valid code. Such errors are called “runtime errors” or, sometimes, “exceptions”.
  } catch (err) {
    console.log("The engine can't understand this code, it's invalid");
}

// try...catch works synchronously
// If an exception happens in “scheduled” code, like in setTimeout, then try...catch won’t catch it. That’s because the function itself is executed later, when the engine has already left the try...catch construct.
try {
    setTimeout(function() {
    //   noSuchVariable; // script will die here
    }, 1);
} catch (err) {
    console.log( "won't work" );
}

// To catch an exception inside a scheduled function, try...catch must be inside that function:

setTimeout(function() {
  try {
    noSuchVariable; // try...catch handles the error!
  } catch {
    console.log( "error is caught here!" );
  }
}, 1000);


// properties (name, message, stack) of built in Error object (Error, SyntaxError, ReferenceError, TypeError and others)
try {
    lalala; // error, variable is not defined!
  } catch (err) {
    console.log(err.name); // ReferenceError
    console.log(err.message); // lalala is not defined
    // console.log(err.stack); // ReferenceError: lalala is not defined at (...call stack)
  
    // Can also show an error as a whole
    // The error is converted to string as "name: message"
    console.log(err); // ReferenceError: lalala is not defined
}


let json = "{ bad json }";

try {

  let user = JSON.parse(json); // <-- when an error occurs...
  console.log( user.name ); // doesn't work

} catch (err) {
  // ...the execution jumps here
  console.log( "Our apologies, the data has errors, we'll try to request it one more time." );
  console.log( err.name );
  console.log( err.message );
}

json = '{ "age": 30 }'; // incomplete data

try {

  let user = JSON.parse(json); // <-- no errors
  console.log( user.name ); // no name! it will show undefined rather than an error
  // The code below will execute normally, even if the previous line failed

} catch (err) {
  console.log( "doesn't execute" );
}

// We need to throw an error manually to make the code below work
try {
    let user = JSON.parse(json); // <-- no errors
    if (!user.name) {
      throw new SyntaxError("Incomplete data: no name"); // (*)
    }
    console.log( user.name ); // doesn't work
} catch (err) {
    console.log( "doesn't execute" );
    console.log( `JSON Error: ${err.message}` ); // JSON Error: Incomplete data: no name
    // The code below will execute normally, even if the previous line failed
}

// check the error type using the instanceof operator

try {
    user = { /*...*/ };
} catch (err) {
    if (err instanceof ReferenceError) {
      console.log('ReferenceError'); // "ReferenceError" for accessing an undefined variable
    }
}

// rethrow the error
function readData() {
    try {
        blabla(); // error 
    } catch (err) {
        if (!(err instanceof SyntaxError)) {
          throw err; // rethrow (*)
        } 
    }
}
try {
    readData();
} catch (err) {
    console.log( "External catch got: " + err ); // caught it!
}
