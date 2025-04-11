// creating an object using object literal syntax
const Animal = {
    type: "Invertebrates", // Default value of properties
    displayType() {
      // Method which will display type of Animal
      console.log(this.type);
    },
};

// Create new animal type called animal1
const animal1 = Object.create(Animal);
animal1.displayType(); // Logs: Invertebrates

// Create new animal type called fish
const fish = Object.create(Animal);
fish.type = "Fishes";
fish.displayType(); // Logs: Fishes

// creating object
const myCar = {
    make: "Ford",
    model: "Mustang",
    year: 1969,
};
const myObj = {};
const str = "myString";
const rand = Math.random();
const anotherObj = {};

// Create additional properties on myObj
myObj.type = "Dot syntax for a key named type";
myObj["date created"] = "This key has a space";
myObj[str] = "This key is in variable str";
myObj[rand] = "A random number is the key here";
myObj[anotherObj] = "This key is object anotherObj";
myObj[""] = "This key is an empty string";

console.log(myObj[""]);

// console.log(myObj."date created"); // Syntax error due to the space between string, thats why we use bracket notation
console.log(myObj["date created"]); // bracket notation


// Accessing object properties
myCar.make = "Ford"; // Dot notation
myCar.model = "Mustang";
myCar.year = 1969;

myCar["make"] = "Ford"; // Bracket notation
myCar["model"] = "Mustang";
myCar["year"] = 1969;


// Creates a new object, checkDelete, with two properties, a and b.
const checkDelete = {}
checkDelete.a = 5;
checkDelete.b = 12;

// Removes the a property, leaving checkDelete with only the b property.
delete checkDelete.a;
console.log("a" in checkDelete); // false

// getter and setter methods
const check_getter_setter = {
    a: 7,
    get b() {
      return this.a + 1;
    },
    set c(x) {
      this.a = x / 2;
    },
};
  
console.log(check_getter_setter.a); // 7
console.log(check_getter_setter.b); // 8, returned from the get b() method
check_getter_setter.c = 50; // Calls the set c(x) method
console.log(check_getter_setter.a); // 25


// comparing objects

// Two variables, two distinct objects with the same properties 
const fruit = { name: "apple" };
const anotherFruit = { name: "apple" };

let comparison = (fruit == anotherFruit); 
console.log(comparison); //false, because they are two different objects in memory and two distinct objects are never equal

// but replacing the value of fruit with anotherFruit results in true
anotherFruit = fruit; // now both variables point to the same object in memory
comparison = (fruit == anotherFruit);
console.log(comparison); // true, because they are now the same object in memory
