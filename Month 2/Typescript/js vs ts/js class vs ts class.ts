// In JS, there is only private to some extend. But in ts, I can use private keyword to make it private. Besides, I can use protected keyword to make it protected. 
// js has private, we can use # to make it private. But in ts, we can use private keyword to make it private.

class Car {
    public brand: string;
    private mileage: number;
  
    constructor(brand: string, mileage: number) {
      this.brand = brand;
      this.mileage = mileage;
    }
  
    protected drive() {
      console.log("Car is Driving...");
    }
}

// In JS, we can't extend a class and override a method. But in ts, we can use extends keyword to extend a class and override a method.
class vehicle extends Car {
    constructor(brand: string, mileage: number) {
        super(brand, mileage);
    }
    public drive() {
        console.log("Vehicle is Driving...");
    }
}

//  TS allows multiple inheritance through interfaces.
//  In JS, we can only extend one class.
interface Flyable {
  fly(): void;
}
interface Swimmable {
  swim(): void;
}
class Duck implements Flyable, Swimmable {
  fly() {
    console.log("Duck is flying");
  }
  swim() {
    console.log("Duck is swimming");
  }
}


function add(a: number, b: number): number;
function add(a: string, b: string): string;

function add(a: any, b: any): any {
  return a + b;
}

add("Hello, ", "World!"); // "Hello, World!"
add(5, 10); // 15