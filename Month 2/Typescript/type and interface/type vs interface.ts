// interface supports declaration merging, while type does not support it.
interface Person {
    name: string;
    age: number;
}
const user: Person = {
    name: "Alice",
    age: 30
};
interface Person {
    nationality: string; 
}
user.nationality = "American"; 
console.log(user.nationality); // Output: American


// declaration merging with type
type PersonType = { 
    name: string;
    age: number;
};
// It will show error due to duplicate name
// type PersonType = {
//     nationality: string;
// }