function ReadOnly(target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      writable: false
    });
}
class Book {
    @ReadOnly
    title = "Decorators in TS";
}
//  Trying to change title at runtime will silently fail or throw an error in strict mode.
const book = new Book();
book.title = "New title"; // This will not change the title property because it is read-only
console.log(book.title); // Output: "Decorators in TS"
//  Trying to change title at runtime will silently fail or throw an error in strict mode.