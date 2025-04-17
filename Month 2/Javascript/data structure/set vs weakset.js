// Example-
{
    let set = new Set();
    let obj = {};
    set.add(obj);          // works
    set.add("hello");      // also works
    set.add(42);           // also works
    console.log(set);      // Set(3)
}
{
    let weakSet = new WeakSet();
    let obj = {};
    weakSet.add(obj);      // works

    weakSet.add("hello"); // Error: "hello" is not an object
    weakSet.add(42);       // Error: 42 is not an object
}

// Example-2
{
    let users = new Set();
    let john = { name: "John" };
    users.add(john);

    console.log(users.has(john)); // true
    john = null;
    // The object still exists inside the set
    // Memory leak if done often
    console.log(users.size); // 1
}
{
    let users = new WeakSet();
    let john = { name: "John" };
    users.add(john);

    console.log(users.has(john)); // true
    john = null;
    // After john is null, object is no longer referenced
    // Automatically garbage collected
    // Cannot check size, can't iterate
}
