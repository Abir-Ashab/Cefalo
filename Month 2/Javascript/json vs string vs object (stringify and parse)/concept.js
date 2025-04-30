// Json is not same as string
let name = "{name: Bob}" // string
let nameObject = JSON.parse(name)
console.log(nameObject.name) // will show error because the string is not a valid JSON format

// Correct way to define a JSON string  
{
    let name = '{"name": "Bob"}' // JSON string with proper format
    let nameObject = JSON.parse(name)
    console.log(nameObject.name) // Bob
}
