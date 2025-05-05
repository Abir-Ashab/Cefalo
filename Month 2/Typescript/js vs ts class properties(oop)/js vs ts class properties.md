### 1. **Class and Constructor**

**JavaScript:**
```js
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
}
```

**TypeScript:**
```ts
class Person {
  constructor(public name: string) {}

  greet(): void {
    console.log(`Hello, I'm ${this.name}`);
  }
}
```

**Difference**: TypeScript adds type annotations (`string`, `void`) and can define and initialize properties directly in the constructor.

---

### 2. **Inheritance**

**JavaScript:**
```js
class Employee extends Person {
  constructor(name, id) {
    super(name);
    this.id = id;
  }

  displayId() {
    console.log(`ID: ${this.id}`);
  }
}
```

**TypeScript:**
```ts
class Employee extends Person {
  constructor(name: string, public id: number) {
    super(name);
  }

  displayId(): void {
    console.log(`ID: ${this.id}`);
  }
}
```

**Difference**: TypeScript defines types (`string`, `number`) and uses public access modifier in constructor.

---

### 3. **Method Overriding**

**JavaScript and TypeScript** (same logic):
```ts
class Animal {
  speak() {
    console.log("Animal speaks");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Dog barks");
  }
}
```

**Polymorphism in action:**
```ts
let a: Animal = new Dog();
a.speak();  // "Dog barks"
```

**Note**: Method overriding behaves the same in both languages.

---

### 4. **Method Overloading**

**JavaScript** does **not** support overloading directly.

**Workaround in JavaScript:**
```js
class Calculator {
  add(a, b) {
    return a + b;
  }
}
```

**TypeScript** supports method overloading with multiple signatures:
```ts
class Calculator {
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: any, b: any): any {
    return a + b;
  }
}
```

**Difference**: In TS, you define multiple method signatures followed by one actual implementation.

---

### 5. **Access Modifiers**

**JavaScript** with `#` (private fields):
```js
class Car {
  #speed = 0;

  setSpeed(s) {
    this.#speed = s;
  }
}
```

**TypeScript**:
```ts
class Car {
  private speed: number = 0;
  protected model: string;

  setSpeed(s: number): void {
    this.speed = s;
  }
}
```

**Difference**:
- JavaScript uses `#` for private fields (ES2022+).
- TypeScript provides `private`, `protected`, and `public` modifiers with broader support and cleaner syntax.

---

### 6. **Abstraction**

**Not natively supported in JavaScript**.

**Simulated JavaScript abstraction**:
```js
class Shape {
  constructor() {
    if (this.constructor === Shape) {
      throw new Error("Abstract class cannot be instantiated");
    }
  }

  getArea() {
    throw new Error("Must implement getArea");
  }
}
```

**TypeScript abstraction**:
```ts
abstract class Shape {
  abstract getArea(): number;
}

class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}
```

**Difference**: TypeScript has first-class support for abstract classes and methods.

---

### 7. **Interfaces (TypeScript only)**

**Not available in JavaScript.**

**TypeScript interface:**
```ts
interface Drawable {
  draw(): void;
}

class Square implements Drawable {
  draw(): void {
    console.log("Drawing square");
  }
}
```

**Difference**: TypeScript allows defining interfaces to enforce a contract for classes.

---

### Summary of Key Differences Illustrated in Code

| Feature              | JavaScript                   | TypeScript                              |
|----------------------|------------------------------|------------------------------------------|
| Class Syntax         | Yes                          | Yes, with types                          |
| Inheritance          | `extends`, `super()`         | Same, with type checking                 |
| Method Overriding    | Yes                          | Yes                                      |
| Method Overloading   | No (simulate via logic)      | Yes (using multiple signatures)          |
| Access Modifiers     | Limited (`#`)                | Full support: `public`, `private`, `protected` |
| Abstraction          | Simulated only               | `abstract` keyword supported             |
| Interfaces           | Not available                | Supported                                |
