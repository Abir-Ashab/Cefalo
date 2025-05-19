**External modules** in TypeScript (now often referred to as **ES modules**) are modules that are imported from external files, as opposed to **ambient modules** (which are generally global or external but declared in your TypeScript project without providing an implementation). External modules allow you to **import and export code** from separate files, enabling modularity, separation of concerns, and better maintainability in larger projects.

### What Are External Modules?

External modules are essentially **JavaScript (or TypeScript) files** that export functions, classes, interfaces, constants, and other entities, which can then be imported into other files using **ES6 module syntax** (`import`/`export`).

**Key Features of External Modules**:
- **Modularized code**: You can split your code into multiple files, each providing different functionality, and then import and export the necessary parts between files.
- **Namespace isolation**: External modules create their own scope, meaning you can avoid polluting the global namespace and avoid naming conflicts.
- **Type checking and IntelliSense**: TypeScript can provide type-checking and autocompletion for both **imported and exported** code.

### How Do External Modules Work in TypeScript?

In TypeScript, **external modules** are any modules that are in a separate file (with `.ts` or `.tsx` extension). These modules use **`import`** and **`export`** statements to share code across files.

#### 1. Exporting from a Module

To export code from a module, you can use the `export` keyword. You can export a variety of things like functions, classes, variables, interfaces, and more.

##### Example: Exporting a Function from a Module

**mathUtils.ts** (Module file)

```ts
// Exporting a function
export function add(a: number, b: number): number {
  return a + b;
}
```

In this file, we’ve created a module that exports the `add` function. This allows other files to import and use this function.

#### 2. Importing into Another File

To use the code from an external module in another file, you use the `import` statement.

##### Example: Importing the Function in Another File

**app.ts** (Another module where we import the `add` function)

```ts
// Importing the add function from mathUtils.ts
import { add } from './mathUtils';

console.log(add(2, 3));  // Outputs: 5
```

- **`import { add } from './mathUtils';`**: This imports the `add` function from the `mathUtils.ts` file.
- Notice how we use the relative file path `./mathUtils`, which points to the module we want to import from.

### Named and Default Exports

In TypeScript, you can have two main types of exports: **named exports** and **default exports**.

#### 1. Named Exports

Named exports allow you to export multiple entities from a module, each of which must be imported by name.

##### Example of Named Exports:

**mathUtils.ts**:

```ts
// Exporting multiple entities
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}
```

**app.ts**:

```ts
// Importing the functions by name
import { add, subtract } from './mathUtils';

console.log(add(2, 3));        // Outputs: 5
console.log(subtract(5, 3));   // Outputs: 2
```

- You can import multiple named exports from the module and use them by name.
- The **braces** `{}` indicate that we are importing named exports.

#### 2. Default Exports

A module can have a single **default export**. The default export is usually used when you only want to export one main entity from the module (for example, a class or a function).

##### Example of Default Export:

**mathUtils.ts**:

```ts
// Default export of a single function
export default function add(a: number, b: number): number {
  return a + b;
}
```

**app.ts**:

```ts
// Importing the default export
import add from './mathUtils';

console.log(add(2, 3));  // Outputs: 5
```

- The `add` function is the **default export** of the `mathUtils.ts` file. When importing it, you don’t need to use `{}` around the name.
- You can only have **one default export** per file.

### Combining Named and Default Exports

You can combine both named exports and default exports in the same module.

##### Example of Combining Exports:

**mathUtils.ts**:

```ts
// Named export
export function subtract(a: number, b: number): number {
  return a - b;
}

// Default export
export default function add(a: number, b: number): number {
  return a + b;
}
```

**app.ts**:

```ts
// Importing both the default and named export
import add, { subtract } from './mathUtils';

console.log(add(2, 3));        // Outputs: 5
console.log(subtract(5, 3));   // Outputs: 2
```

### Importing Entire Modules

Sometimes you might want to import the entire module as a single object, so that you can access all exports through that object.

##### Example: Importing the Entire Module

**mathUtils.ts**:

```ts
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}
```

**app.ts**:

```ts
// Importing the entire module as an object
import * as MathUtils from './mathUtils';

console.log(MathUtils.add(2, 3));       // Outputs: 5
console.log(MathUtils.subtract(5, 3));  // Outputs: 2
```

- **`import * as MathUtils from './mathUtils';`**: This imports everything from the `mathUtils` module into an object called `MathUtils`. You can then access the `add` and `subtract` functions as properties of this object.

### External Modules in Node.js

In a Node.js project, external modules are typically used through **CommonJS modules** (using `require` and `module.exports`) or **ES modules** (using `import`/`export`).

- **CommonJS** modules are the default module system in Node.js. However, modern TypeScript and JavaScript projects use **ES modules** because they are part of the ECMAScript standard.
  
In TypeScript, when you set `"module": "ESNext"` in your `tsconfig.json`, it compiles your code to **ES modules** that use `import`/`export` statements.

### Example: Using External Modules in Node.js with TypeScript

**mathUtils.ts**:

```ts
export function add(a: number, b: number): number {
  return a + b;
}
```

**app.ts**:

```ts
import { add } from './mathUtils';

console.log(add(2, 3));  // Outputs: 5
```

### Summary of External Modules

1. **External modules** in TypeScript are files that contain **exported code** (functions, classes, variables, etc.) that you can **import** into other files.
2. Use **`export`** to make code available to other files and **`import`** to bring that code into another file.
3. You can have **named exports** (exporting multiple entities) or a **default export** (a single entity per file).
4. **Modularization** allows you to keep your code organized, maintainable, and reusable across different parts of your application.
5. TypeScript's static type-checking also works with external modules, providing better tooling and safety when importing/exporting.

External modules are an essential part of modern JavaScript and TypeScript development, helping developers structure their applications in a more modular and scalable way.
