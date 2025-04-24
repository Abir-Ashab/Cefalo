// Basic promise example
{
  const myPromise = new Promise((resolve) => {
    let result = "Hello, World!";
    resolve(result);
  });
  console.log(myPromise); // Promise { 'Hello, World!' } ----> promise is resolved.
  myPromise
    .then((result) => {
      console.log("Promise resolved with:", result);
    })
    .catch((error) => {
      console.error("Promise rejected with:", error);
    });
}

// Promise with setTimeout
{
  const learnPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true; // change this to false to test error
      if (success) {
        resolve("You understood Promises! 🎉");
      } else {
        reject("You got stuck 😓");
      }
    }, 2000);
  });

  console.log(learnPromise); // This will log the Promise object, pending

  // Using .then() and .catch() to handle the resolved or rejected state of the promise
  learnPromise
    .then((result) => {
      console.log(learnPromise); // You understood Promises! 🎉 ----> promise is resolved
      console.log("Success:", result);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

// promise with fetch
{
  fetch("https://jsonplaceholder.typicode.com/posts/1") // fetch by default returns a promise
    .then((response) => response.json())
    .then((data) => {
      console.log("Post:", data);
    })
    .catch((error) => {
      console.error("Error fetching:", error);
    });
}

// Run multiple tasks in parallel
{
  const p1 = fetch("https://jsonplaceholder.typicode.com/posts/1");
  const p2 = fetch("https://jsonplaceholder.typicode.com/posts/2");

  Promise.all([p1, p2])
    .then((responses) => Promise.all(responses.map((res) => res.json())))
    .then((data) => console.log("Both Posts:", data))
    .catch((err) => console.error("One or more failed:", err));
}
