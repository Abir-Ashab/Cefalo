function Logger(constructor: Function) { // decorator function
    console.log("Class instantiated:", constructor.name);
}
  
@Logger
class Person {
    constructor() {
      console.log("Person created");
    }
}

// instead of Function, we can use any type for the constructor parameter, but it is not recommended
// because it can be any type, and we don't know what it is, so we can't use it as a constructor
{
    function Logger2(constructor: any) { 
        console.log("Class instantiated:", constructor.name);
    }
      
    @Logger2
    class Person {
        constructor() {
          console.log("Person created");
        }
    }
}