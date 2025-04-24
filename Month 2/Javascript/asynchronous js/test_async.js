async function fetchWithErrorHandling() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts/1"); // fetch by default returns a promise, so we don't need to use new Promise here.
    console.log("Response:", response); // This will log the Response object, pending
    
    let data = response.json(); 
    console.log("Data using async/await:", data);
  } catch (error) {
    console.error("Failed to fetch:", error);
  }
}

fetchWithErrorHandling();
