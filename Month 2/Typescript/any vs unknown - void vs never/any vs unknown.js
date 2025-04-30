// any --> "I don’t care about type safety."
{
    var value = "Hello";
    value.trim(); // OK
    value(); // OK (but crashes at runtime if not a function)
    value.toFixed(); // OK (even if it's not a number)
    var anyValue = 123;
    var str1 = anyValue; // OK
}
// unknown --> "I don’t know the type yet, so I'll treat it carefully."
{
    var value = "Hello";
    // value.trim(); // Error: Object is of type 'unknown'
    if (typeof value === "string") {
        value.trim(); // OK after type check
        console.log(value); // OK after type check
    }
    var unknownValue = 123;
    // let str2: string = unknownValue; // Error: Type 'unknown' is not assignable to type 'string'
    var str3 = unknownValue; // OK with assertion
}
