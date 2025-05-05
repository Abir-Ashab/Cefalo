type Name = string;
type Age = number;
type User = {
  name: Name;
  age: Age;
};
type UserAlias = User & { email: string };

type ID = string | number;
{
    type ID = keyof User; // Similar to string | number, but only allows the keys of User
}

type Product = {
  id: ID;
  name: string;
  price: number;
};

let product: Product = {
    id: 1,
    name: "Laptop",
    price: 1000,
};
console.log(product.id); // Output: 1

