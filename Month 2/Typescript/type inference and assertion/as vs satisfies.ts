// as Skips structural checking,  Forcibly narrows or widens the type
type Color = "red" | "green" | "blue";
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255]
} as Record<Color, string | number[]>;

palette.green.toUpperCase(); // Error at runtime if not actually a string


// satisfies Preserves the precise inferred types of each property, and checks the structure of the object against the type
{
    type Color = "red" | "green" | "blue";
    const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    bleu: [0, 0, 255] // ✅ Compile-time error: 'bleu' is not assignable to 'Color'
    } satisfies Record<Color, string | number[]>;

    palette.green.toUpperCase(); // ✅ Allowed — TypeScript knows it's a string

}


// another example
// using as
{
    const person = {
        name: "Alice",
        age: 30
    } as { name: string | number; age: number };      
    console.log(person.name.length); // Property 'length' does not exist on type 'string | number'
    
}

// using satisfies
{
    const person = {
        name: "Alice",
        age: 30
    } satisfies { name: string | number; age: number };      
    console.log(person.name.length); // correctly infers the type as string, so this is allowed
}