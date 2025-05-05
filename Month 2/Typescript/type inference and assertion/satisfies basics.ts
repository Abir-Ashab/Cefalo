const str = "hello" as const; // Type: "hello"
const str2 = "hello" as string; // Type: string
const str3 = "hello" satisfies string; // Error: string is not a value, cannot use `satisfies` like this because satisfies is for objects or arrays, not for primitives directly.

const obj: { name: string; age: number } = {
    name: "hello",
    age: 10
};

const obj2 = {
    name: "komola",
    age: 70
} satisfies typeof obj;