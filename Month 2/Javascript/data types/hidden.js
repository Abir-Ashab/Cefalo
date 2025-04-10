let user = { // belongs to another code
    name: "John"
};

let id = Symbol("id");
user[id] = "Our id value"; // set the symbol as the key in the object
console.log(user[id]); // get the value by the symbol key

{
    let id = Symbol("id");
    user[id] = "Their id value";
    console.log(user[id]);
}

console.log(user[id]); // shows the value of the first id, modification does not affect as it was symbol not string


let id2;
user[id2] = "Our id value"; // set the symbol as the key in the object
console.log(user[id2]); // get the value by the symbol key

{
    let id2;
    user[id2] = "Their id value";
    console.log(user[id2]);
}

console.log(user[id2]); // shows the value of the second id, modilified in the block scope due to string key