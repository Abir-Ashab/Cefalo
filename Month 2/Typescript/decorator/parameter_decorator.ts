function Required(target: Object, methodName: string, parameterIndex: number) {
    const key = `${target.constructor.name}_${methodName}`;
    if (!requiredParams[key]) {
      requiredParams[key] = [];
    }
    requiredParams[key].push(parameterIndex);
  }
  
  function Validate(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const key = `${target.constructor.name}_${methodName}`;
      const required = requiredParams[key] || [];
      for (const index of required) {
        if (args[index] === undefined || args[index] === null) {
          throw new Error(`Missing required argument at index ${index}`);
        }
      }
      return original.apply(this, args);
    };
  }
  
  const requiredParams: Record<string, number[]> = {};
  
  class UserService {
    // @Validate
    createUser(name: string, age: number) {
      console.log(`User created: ${name}, age ${age}`);
    }
  }
  
  const service = new UserService();
  service.createUser("Alice", 25); // OK
  (service.createUser as any)(2);  // Won't throw error, but will log "User created: 2, age undefined"
  
  {
    class UserService {
        // @Validate
        createUser(@Required name: string, @Required age: number) {
          console.log(`User created: ${name}, age ${age}`);
        }
      }
      
      const service = new UserService();
      service.createUser("Alice", 25); // OK
      (service.createUser as any)(2);  // Will throw error for missing required argument
  }