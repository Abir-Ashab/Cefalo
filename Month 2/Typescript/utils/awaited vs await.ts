// awaited --> just give me the resolved "type" of a promise without using .then() or await
// Removes the Promise wrapper from a type, giving you the type of the value that the Promise resolves to.

type MyPromise = Promise<string>;

type Result = Awaited<MyPromise>; 
// Result is: string


async function fetchData() {
    return { id: 1, name: 'Alice' };
}
async function fetchData2() {
    const Data = await fetchData(); 
    console.log(Data); // { id: 1, name: 'Alice'}
}

// type Data = Awaited<fetchData>; // Awaited expects a type, not a function
type Data = Awaited<ReturnType<typeof fetchData>>; // { id: number; name: string }

// without awaited, it would be like this
type DataWithoutAwaited = ReturnType<typeof fetchData>; // Promise<{ id: number; name: string }>
