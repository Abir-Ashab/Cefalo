type User = {
    id: number;
    name: string;
};
const user: Readonly<User> = {
    id: 1,
    name: 'Alice'
};
user.name = 'Bob'; // Error: Cannot assign to 'name'
  