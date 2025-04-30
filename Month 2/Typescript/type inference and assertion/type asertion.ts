// way-1 
let value: any = "Hello, TypeScript";
let value_string = value as string

console.log(typeof value_string); // Output: string

// way-2
{
    let value: any = 1;
    let value_number = <number> value
    console.log(typeof value_number); // Output: number
}


const colors = ['red', 'green', 'blue'] as const;
// colors is now of type read-only ['red', 'green', 'blue']
// This means you cannot change the array or its elements

// we can assign any value to anyValue, regardless of its type
let anyValue: any = 42;
anyValue = 'Hello, world!';
anyValue = true;