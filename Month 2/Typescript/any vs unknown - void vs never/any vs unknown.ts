// any --> "I don’t care about type safety."
{
    let value: any = "Hello";
    value.trim();     // OK
    value();          // OK (but crashes at runtime if not a function)
    value.toFixed();  // OK (even if it's not a number)

    let anyValue: any = 123;
    let str1: string = anyValue;      // OK
}

// unknown --> "I don’t know the type yet, so I'll treat it carefully."
// unknown is a safer alternative to any. It forces you to perform type checks before using the value.
{
    let value: unknown = "Hello";
    // value.trim(); // Error: Object is of type 'unknown'
    if (typeof value === "string") {
    value.trim(); // OK after type check
    console.log(value); // OK after type check
    }
    let unknownValue: unknown = 123;
    // let str2: string = unknownValue; // Error: Type 'unknown' is not assignable to type 'string'
    let str3: string = unknownValue as string; // OK with assertion
}