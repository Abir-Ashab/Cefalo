// interface supports declaration merging, while type does not support it.
interface Person {
    name: string;
    age: number;
}

interface Person {
    nationality: string;
}

const user: Person = {
    name: "Alice",
    age: 30,
    nationality: "American"
};

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

// Interface
interface Person2 {
    name: string;
}
  
interface Employee2 extends Person2 {
    employeeId: number;
}
  
  // Type alias with intersection
type PersonAlias = {
    name: string;
};
  
type EmployeeAlias = PersonAlias & {
    employeeId: number;
};
  


