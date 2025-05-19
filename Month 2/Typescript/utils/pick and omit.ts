// pick --> Creates a new type by picking specific keys K from type T.
type User = {
    id: number;
    name: string;
    age: number;
};
type BasicInfo = Pick<User, 'id' | 'name'>; // { id: number; name: string }
const user: BasicInfo = {
    id: 1,
    name: 'John',
    // age: 30, // Error: Type 'number' is not assignable to type 'never'.
}


// omit --> Opposite of Pick. It removes keys K from type T.
{
    type User = {
        id: number;
        name: string;
        age: number;
    };
    type WithoutAge = Omit<User, 'age'>; // { id: number; name: string }
}
  

