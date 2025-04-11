// create new object
var a = { x: 10, y: 20 };

// creating a new object with a given prototype
var b = Object.create(a);

console.log(b);

console.log('b.x:', b.x);
console.log('b.y:', b.y);

// add the properties one-by-one
b.p = 100;
b.q = 200;

console.log('b.p:', b.p);
console.log('b.q:', b.q);

var c = Object.create(b)
console.log(c.x); // 10
console.log(c.y); // 20
console.log(c.p); // 100
console.log(c.q); // 200

// identify own properties and prototype properties
var proto = { z: 0 };

var own = Object.create(proto);
own.x = 0;
own.y = 0;

console.log(own.hasOwnProperty('x')); // true
console.log(own.hasOwnProperty('y')); // true
console.log(own.hasOwnProperty('z')); // false, this is from prototype
console.log(proto.hasOwnProperty('z')); // true

console.log('z' in own); // true, so in does not check own properties


//retrieving the prototype of an object
// For a given object o, its __proto__ property simply returns a reference to the prototype of o.

// Retrieve prototypes using __proto__
console.log([1, 2, 3].__proto__ === Array.prototype); // true
console.log({ x: 0 }.__proto__ === Object.prototype); // true
console.log((10).__proto__ === Number.prototype); // true
console.log('10'.__proto__ === String.prototype); // true

// Custom prototype via Object.create
var a = {};
console.log(Object.create(a).__proto__ === a); // true

// Functions have unique behavior
function F() {}
console.log(F.__proto__ === F.prototype); // false
console.log(F.__proto__ === Function.prototype); // true
console.log((new F()).__proto__ === F.prototype); // true


// Retrieve prototypes using Object.getPrototypeOf() --> standard way
console.log(Object.getPrototypeOf([1, 2, 3]) === Array.prototype); // true
console.log(Object.getPrototypeOf({ x: 0 }) === Object.prototype); // true
console.log(Object.getPrototypeOf(10) === Number.prototype); // true
console.log(Object.getPrototypeOf('10') === String.prototype); // true

// Custom prototype
var a = {};
console.log(Object.getPrototypeOf(Object.create(a)) === a); // true

// Function behavior
function F() {}
console.log(Object.getPrototypeOf(F) === F.prototype); // false
console.log(Object.getPrototypeOf(F) === Function.prototype); // true
console.log(Object.getPrototypeOf(new F()) === F.prototype); // true


// before we created new prototype object with a given prototype, but what if we have an existing object and want to change its prototype to some other object? Here is how:

// way -1
{
    var a = { x: 10, y: 20 };
    var b = { p: 100, q: 200 };

    b.__proto__ = a; // making a simple object 'a', the prototype of b

    console.log('b.x:', b.x);
    console.log('b.y:', b.y);

    console.log('b.p:', b.p);
    console.log('b.q:', b.q);
}

// way-2
{
    var a = { x: 10, y: 20 };
    var b = { p: 100, q: 200 };

    Object.setPrototypeOf(b, a);

    console.log('b.x:', b.x);
    console.log('b.y:', b.y);

    console.log('b.p:', b.p);
    console.log('b.q:', b.q);
}