function func1(a, b, c) {
  console.log(arguments[0]); // 1
  console.log(arguments[1]); // 2
  console.log(arguments[2]); // 3
  console.log(arguments[3]); // undefined, because no fourth argument was passed
}
func1(1, 2, 3);

function func(a) {
  arguments[0] = 99; // updating arguments[0] also updates a
  console.log(a);
  a = 9; // updating a also updates arguments[0]
  console.log(arguments[0]); // 9, because a was updated to 9
}
func(10); // 99

// but in default, rest and destructuring parameters, the arguments object is not updated when the parameter is updated
function funcWithDefault(a = 55) {
    console.log(arguments[0]); // 10, because arguments[0] is the first argument passed to the function
    console.log(a); // 10
    arguments[0] = 99; // updating arguments[0] does not update a
    console.log(a); 
    a = 10; // updating a does not also update arguments[0]
    console.log(arguments[0]); // 99, because arguments[0] was updated to 99
}
funcWithDefault(10); // 10
  