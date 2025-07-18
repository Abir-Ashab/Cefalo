// function SimpleLogger(constructor: string) { // receiving the constructor as string, which is the name of the class, so it is valid
//     console.log("A class was defined: " + constructor);
// }

function SimpleLogger(constructor: any) { // receiving the constructor as any which is the class itself, the functions, properties, etc. so it is valid
    console.log("A class was defined: " + constructor);
}

// function SimpleLogger(constructor: Function) { // receiving the constructor as Function which is like the class's constructor, so it is also valid
//     console.log("A class was defined: " + constructor);
// }

@SimpleLogger // just like SimpleLogger(Car) ---> passing the car constructor to the SimpleLogger function
class Car {
    brand: string;
  
    constructor(brand: string) {
      this.brand = brand;
      console.log("hello from the constructor of Car class", this.brand);
      
    }
}


// We can also use the decorator in other locations, like in a function or property
{
    function SimpleLogger2(constructor: any, name: string) { 
        console.log("A class was defined: " + name ); 
    }

    class Car {
        @SimpleLogger2 // 
        brand: string;
    
        constructor(brand: string) {
            this.brand = brand;
            console.log("hello from the constructor of Car class", this.brand);  
        }
    }
    const car = new Car("BMW");
}