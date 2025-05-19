### What is a Decorator?

A decorator in TypeScript is a special kind of declaration that can be attached to classes, methods, accessors, properties, or parameters. It allows you to add custom behavior or metadata to the element it's attached to. Under the hood, a decorator is always a function.

When the TypeScript compiler encounters a decorator, it invokes the decorator function with specific arguments depending on the type of target (class, method, property, etc.).

---

### Decorators Are Always Functions

Every decorator is a function that either:

- Takes specific arguments based on what it's decorating
- Optionally returns a new function or object (especially for class and method decorators)

---

### Types of Decorators and Their Parameters

1. **Class Decorator**
   - Signature: `(constructor: Function) => void | Function`
   - Applied to a class
   - Receives the class constructor as an argument
   - Can return a modified or extended constructor

2. **Property Decorator**
   - Signature: `(target: Object, propertyKey: string | symbol) => void`
   - Applied to a property
   - Receives the prototype and the name of the property

3. **Method Decorator**
   - Signature: `(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void | PropertyDescriptor`
   - Applied to methods
   - Can override or extend the method’s behavior

4. **Accessor Decorator**
   - Same signature as method decorators
   - Applied to `get` or `set` accessors

5. **Parameter Decorator**
   - Signature: `(target: Object, propertyKey: string | symbol, parameterIndex: number) => void`
   - Applied to parameters inside constructors or methods
   - Used to store metadata about parameters (e.g., for validation or injection)

---

### Execution Timing and Order

- Decorators are executed when the class is defined, not when it's instantiated or used.
- When multiple decorators are applied, they are evaluated from the bottom up (last to first) and executed in the same order.
- Class decorators always run last, after parameter, method, accessor, and property decorators.

---

### Example Overview

```ts
function Logger(constructor: Function) {
  console.log("Class instantiated:", constructor.name);
}

@Logger
class Person {
  constructor() {
    console.log("Person created");
  }
}
```

In this example, the `Logger` function is a class decorator. When the class is defined, the decorator logs the class name. It does not wait for an instance to be created. If you call `new Person()`, then the constructor's logic will also run.

---

### Decorator Factories

Sometimes decorators need arguments. In that case, we use a decorator factory: a function that returns a decorator.

```ts
function Role(role: string) {
  return function (constructor: Function) {
    console.log(`${constructor.name} requires role: ${role}`);
  };
}

@Role("admin")
class AdminPanel {}
```

Here, `Role("admin")` returns the actual decorator, which gets executed with the class constructor.
