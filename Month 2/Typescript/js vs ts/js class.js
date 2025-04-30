class Car {
    constructor(brand, mileage) {
      this.brand = brand;
      this._mileage = mileage; // simulate private field using naming convention
    }
  
    // simulate protected method (not truly protected in JS)
    drive() {
      console.log("Car is Driving...");
    }
}

class A {}
class B {}
//   class C extends A, B {} //  SyntaxError --> as JS does not support multiple inheritance
  
  