**Question:**

Bhai, in your slide you mentioned that **TypeScript supports method overloading**, but **JavaScript doesn't**.

You showed this example:

```ts
function add(a: number, b: number): number; // signature
function add(a: string, b: string): string;

function add(a: any, b: any): any {
  return a + b;
}

add("Hello, ", "World!"); // "Hello, World!"
add(5, 10);               // 15
```

But here’s what I don’t understand:

You just wrote **two signatures** with different types, then used a generic implementation with `any`. But this same behavior works in **vanilla JavaScript** without any overloads — I can pass two strings or two numbers and get a result.

So my question is:

**What’s the actual advantage of TypeScript method overloading in this case**, when the behavior seems identical to regular JavaScript?
