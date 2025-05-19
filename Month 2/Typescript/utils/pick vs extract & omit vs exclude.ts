// exclude is for union types, omit is for object types
type Status = 'active' | 'inactive' | 'banned';
type CleanStatus = Exclude<Status, 'banned'>; // 'active' | 'inactive'

{
    type User = {
        id: number;
        name: string;
        age: number;
    };
    type WithoutAge = Exclude<User, 'age'>; // { id: number; name: string }
    // using exclude on object makes no sense, its just like saying “Remove 'age' from User, only if User is a union that includes 'age'.” Since it's not, it gives you back the original User type. No syntax error — just incorrect logic.
}


// extract --> opposite of exclude. It takes a union type and returns a new type that only includes the members that are also in another type.
{
    type Status = 'active' | 'inactive' | 'banned';
    type Allowed = Extract<Status, 'active' | 'inactive'>;
    // 'active' | 'inactive'

}