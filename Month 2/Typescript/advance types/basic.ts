// Mapped types allow you to create a new type by transforming properties of an existing type.
type Person = { name: string, age: number };
type ReadOnlyPerson = {
  readonly [K in keyof Person]: Person[K];
};

let person: ReadOnlyPerson = { name: "Alice", age: 30 };
// person.age = 31;  // Error, 'age' is read-only


// Conditional types allow you to express types that depend on a condition. These types are evaluated at compile time based on another type.
type IsString<T> = T extends string ? "Yes" : "No";
type A = IsString<string>;  // "Yes"
type B = IsString<number>;  // "No"


// Literal types allow you to specify a specific value as a type rather than a general type. This ensures that a variable can only be one of a set of predefined values. Literal types can be used with strings, numbers, booleans, and other primitive values.
let direction: "left" | "right"; // `direction` must be either "left" or "right"
direction = "left";  // OK
// direction = "up";    // Error: Type '"up"' is not assignable to type '"left" | "right"'



// Template literal types allow you to create new string literal types by combining existing string literal types with template literals. This is useful for creating more complex string types based on existing ones.
type Greeting = `Hello, ${string}!`;

let greeting1: Greeting = "Hello, Alice!";  // OK
let greeting2: Greeting = "Hello, Bob!";    // OK
// let greeting3: Greeting = "Hi, Alice!";     // Error: Type '"Hi, Alice!"' is not assignable to type 'Greeting'



// Recursive types allow you to define a type that references itself. This is useful for defining complex data structures like trees or linked lists.
type TreeNode = {
    value: number;
    left?: TreeNode;  // Recursively references the TreeNode type
    right?: TreeNode; // Recursively references the TreeNode type
  };
  
  const node: TreeNode = {
    value: 10,
    left: {
      value: 5
    },
    right: {
      value: 15,
      left: {
        value: 12
      }
    }
  };
  