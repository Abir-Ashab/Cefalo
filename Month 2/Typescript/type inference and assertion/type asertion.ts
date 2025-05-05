// type assertions are a way to tell the TypeScript compiler to trust you about the type of a value, even if it can’t verify it. But this does not change the value itself. The actual type at runtime stays the same.

// way-1 
let value: any = "Hello, TypeScript";
let value_number = value as number
// console.log(value_number.toFixed(2)); // It would throw an error at runtime as value is not a number, but it will not throw the error this time as we are using type assertion by using 'as' keyword

console.log(typeof value_number); // Output: string

// way-2
{
    let value: any = 1;
    let value_number = <number> value // another way of type assertion
    console.log(typeof value_number); // Output: number
}


const colors = ['red', 'green', 'blue'] as const;
// colors is now of type read-only ['red', 'green', 'blue']
// This means you cannot change the array or its elements

// we can assign any value to anyValue, regardless of its type
let anyValue: any = 42;
anyValue = 'Hello, world!';
anyValue = true;


// The non-null assertion operator (!) is a type assertion in TypeScript that allows you to tell the compiler that a value will never be null or undefined.

let userFullName: string | null = null;
{
    // let userFullNameLength = userFullName.length; // This will throw an error because userFullName can be null
}
// we use the non-null assertion operator to tell the compiler that userFullName will never be null
let userFullNameLength = userFullName!.length;