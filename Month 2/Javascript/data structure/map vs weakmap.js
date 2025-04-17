// difference 1
{
    let weakMap = new Map();
    let obj = {};
    weakMap.set(obj, "ok"); // works fine (object key)
    weakMap.set("test", "Whoops"); // works fine (string key)
}
{
    let weakMap = new WeakMap();
    let obj = {};
    weakMap.set(obj, "ok"); // works fine (object key)
    // can't use a string as the key
    // weakMap.set("test", "Whoops"); // Error, because "test" is not an object
}

// difference 2
{
    let visitsCountMap = new Map(); // map: user => visits count
    function countUser(user) {
    let count = visitsCountMap.get(user) || 0;
    visitsCountMap.set(user, count + 1);
    }
    let john = { name: "John" };
    countUser(john); 
    console.log(visitsCountMap.get(john)); // 1
    john = null;
    console.log(visitsCountMap.size); // 1, after removing john, the map is not cleared
    
    console.log(visitsCountMap.get(john)); // undefined, john is garbage collected
    // Garbage collection in JavaScript is non-deterministic. That means:
    // 1. You don’t know exactly when it happens.
    // 2. It may not run immediately after obj = null.
}
{
    let visitsCountMap = new WeakMap(); // map: user => visits count
    function countUser(user) {
    let count = visitsCountMap.get(user) || 0;
    visitsCountMap.set(user, count + 1);
    }
    let john = { name: "John" };
    countUser(john); // count his visits
    console.log(visitsCountMap.get(john)); // 1
    john = null;
    // console.log(visitsCountMap.size); // Error: WeakMap has no size property
    console.log(visitsCountMap.get(john)); // undefined, but it is permanently removed from the map
}

// important use cases of WeakMap: If we’re working with an object that “belongs” to another code, maybe even a third-party library, and would like to store some data associated with it, that should only exist while the object is alive – then WeakMap is exactly what’s needed.