function identity<T>(value: T): T {
    return value;
}
const num = identity(10);        // T is number
const str = identity("hello");   // T is string

// Without generics, you'd either: Lose type safety by using any, or Have to write the same code multiple times for different types.

// Generic with array
function firstElement<T>(arr: T[]): T {
    return arr[0];
}
const firstNum = firstElement([1, 2, 3]);         // number type
const firstStr = firstElement(["a", "b", "c"]);   // string type
const firstBool = firstElement([true, false]);    // boolean type


  