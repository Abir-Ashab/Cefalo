// Simulate async login function
function loginUser(username, password, check_callback) {
  setTimeout(() => {
    console.log("User logged in");
    check_callback({ id: 1, username });
  }, 1000);
}

// Simulate async profile fetching
function getUserProfile(userId, check_callback) {
  setTimeout(() => {
    console.log("Profile fetched");
    check_callback({ username: "niloy", age: 25 });
  }, 1000);
}

// Simulate async post fetching
function getUserPosts(username, check_callback) {
  setTimeout(() => {
    console.log("Posts fetched");
    check_callback([{ id: 101, title: "Async JS" }]);
  }, 1000);
}

// Simulate async comment fetching
function getPostComments(postId, check_callback) {
  setTimeout(() => {
    console.log("Comments fetched");
    check_callback(["Great post!", "Very helpful"]);
  }, 1000);
}

// Executing the check_callbacks in nested form
loginUser("niloy", "password", (user) => {
  getUserProfile(user.id, (profile) => {
    getUserPosts(profile.username, (posts) => {
      getPostComments(posts[0].id, (comments) => {
        console.log("Comments:", comments);
      });
    });
  });
});

console.log("Ehh he aha aha, oh ho, oho...");
