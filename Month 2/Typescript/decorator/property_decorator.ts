function ReadOnly(target: any, propertyKey: string) {
  const backingField = `__${propertyKey}`;

  Object.defineProperty(target, propertyKey, {
    get: function () {
      return this[backingField];
    },
    set: function (value: any) {
      if (this[backingField] === undefined) {
        Object.defineProperty(this, backingField, {
          value,
          writable: false,
          enumerable: false,
          configurable: false
        });
      } else {
        console.warn(`${propertyKey} is read-only`);
      }
    },
    enumerable: true,
    configurable: false
  });
}

class Book {
  @ReadOnly
  title: string;

  constructor(title: string) {
    this.title = title;
  }
}

const book = new Book("Decorators in TS");
console.log(book.title); // "Decorators in TS"

book.title = "New title"; // Will log warning
console.log(book.title); // Still "Decorators in TS"
