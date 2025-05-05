function logLength<T extends { length: number }>(item: T): void {
    console.log(item.length);
}

logLength("hello");       // OK: string has length
logLength([1, 2, 3]);      // OK: array has length
// logLength(123);        // Error: number doesn't have length


// Constraining to a Specific Class or Interface
class Animal {
    name: string = "";
} 
let animal : Animal = { name: "Dog" }; // OK
class Dog extends Animal {
    breed: string = "";
}
function greet<T extends Animal>(animal: T): void {
    console.log(`Hello, ${animal.name}`);
}
greet(new Dog());         // OK
greet({ name: "Cat" });  // OK: object with name property
greet(animal)       // OK: instance of Animal

// greet({ breed: "Poodle" }); // Error: Missing 'name'

  