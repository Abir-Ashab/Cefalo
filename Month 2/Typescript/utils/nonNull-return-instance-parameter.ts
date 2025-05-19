// nonNullable --> NonNullable<T> removes null and undefined from type T
type MaybeName = string | null | undefined;
type Name = NonNullable<MaybeName>; // string

// ReturnType<T> --> Extracts the return type of a function type T
function getUser() {
    return { id: 1, name: 'Alice' };
}
type User = ReturnType<typeof getUser>; // { id: number; name: string }

// InstanceType<T> --> Extracts the instance type of a constructor function type T. It is just like creating a new instance of a class and getting its type by using the new keyword
class Person {
    name = 'John';
}

type PersonInstance = InstanceType<typeof Person>; 

const person: PersonInstance = new Person(); // { name: 'John' }
// const person: Person = new Person(); ---? Similar to the above line, but this is not a type assertion. It is just creating a new instance of the Person class and getting its type by using the new keyword.
console.log(person.name); // Output: John


// Parameters<T> --> Extracts a tuple of the parameter types of a function type.
{
    function greet(name: string, age: number): void {}
    type GreetParams = Parameters<typeof greet>;
    // [name: string, age: number]
}
  