// async without await
async function myAsyncFunction() {
  return "Hello from async!";
}
console.log(myAsyncFunction()); // Promise { 'Hello, World!' } ----> promise is resolved.

myAsyncFunction().then((res) => {
  console.log("myAsyncFunction:", res);
});

// async & await with timeout
async function fetchMessage() {
  let result = await new Promise((resolve) => {
    setTimeout(() => resolve("Message received after 2 seconds!"), 2000);
  });
  console.log("fetchMessage:", result);
}

fetchMessage();

// async & await with fetch + try/catch
async function fetchWithErrorHandling() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts/1"); // fetch by default returns a promise, so we don't need to use new Promise here.
    let data = await response.json(); // response.json() is async and returns a Promise — so I need to await it to get the data. 
    response.json()
       .then ((data) => {
         console.log("Data using async/await:", data);
       })
       .catch((error) => {
         console.error("Failed to fetch:", error);
       });
    console.log("Data using async/await:", data);
  } catch (error) {
    console.error("Failed to fetch:", error);
  }
}

fetchWithErrorHandling();

// async/await with loop (for...of)
const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
];

async function fetchMultiplePosts() {
  for (let url of urls) {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Post from loop:", data);
  }
}

fetchMultiplePosts();

// fetch multiple posts in parallel using async/await
{
  async function fetchMultiplePosts() {
    try {
      // Start both fetches in parallel
      const p1 = fetch("https://jsonplaceholder.typicode.com/posts/1");
      const p2 = fetch("https://jsonplaceholder.typicode.com/posts/2");

      // Wait for both to resolve
      const [res1, res2] = await Promise.all([p1, p2]);

      // Convert both responses to JSON
      const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

      // Use the data
      console.log("Post 1:", data1);
      console.log("Post 2:", data2);
    } catch (error) {
      console.error("One or more fetches failed:", error);
    }
  }

  fetchMultiplePosts();
}
