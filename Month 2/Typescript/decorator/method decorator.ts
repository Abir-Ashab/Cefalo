function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    console.log(`Original method: ${original}`);
    // overriding the method
    descriptor.value = function (...args: any[]) {
        console.log(`Called ${propertyKey} with args: ${args.join(",")}`);
        return original.apply(this, args); // calling the original method with the current context and arguments
    }
}

class Calculator {
    @Log
    add(a: number, b: number) {
        return a + b;
    }
}

const calc = new Calculator();
console.log(calc.add(2, 3)); // Output: Called add with args: 2,3
// Output: 5


