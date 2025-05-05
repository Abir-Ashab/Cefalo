interface Point {
    x: number;
    y: number;
}

let p1: Point = { x: 10, y: 20 };
let p2: { x: number; y: number } = p1;
console.log(p2.x); // Output: 10


let p3: { x: number; y: number } = { x: 30, y: 40 };
let p4: Point = p3; // This is valid because p3 has the same structure as Point
let p5: Point & { z: number } = { x: 50, y: 60, z: 70 }; // This is valid because Point is extended with z
