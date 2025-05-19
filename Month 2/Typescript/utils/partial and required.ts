// normally
type User = {
    id: number;
    name: string;
};
const updateUser = (user: User) => { 
    if (user.name) console.log(`Updating name to ${user.name}`);
};
updateUser({ id: 1, name: "john" });

// usign partial --> Makes all properties optional in type User
{
    type User = {
        id: number;
        name: string;
    };
      
    const updateUser = (user: Partial<User>) => { // can update just part of the user
        if (user.name) console.log(`Updating name to ${user.name}`);
    };
    
    updateUser({ id: 1 }); // Output: Updating name to undefined
    updateUser({ name: 'John' }); // Output: Updating name to John
}

// using required --> Makes all properties required in type User, opposite of partial
{
    type Props = {
        id?: number;
        name?: string;
      };
      
      const logProps = (p: Required<Props>) => {
        console.log(p.id, p.name); // id and name must be provided
      };
      
}