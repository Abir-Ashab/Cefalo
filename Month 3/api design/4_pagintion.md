### Pagination

**Pagination** is the process of dividing a large dataset into smaller chunks (pages) to improve performance and usability. Instead of fetching or displaying all records at once (which can be inefficient), you fetch or show a limited number at a time.

For example, in a blog with 10,000 posts, showing 10 per page is more efficient. You only load the specific set of posts the user wants to see.

---

### Types of Pagination

1. **Offset-based pagination**: Uses `LIMIT` and `OFFSET` (or `skip` in MongoDB).

   * Common in SQL and NoSQL databases.
   * Easy to implement.
   * Can become inefficient for large `OFFSET` values.

2. **Cursor-based pagination**: Uses a unique identifier (like timestamp or ID) to fetch the next page.

   * More efficient for large datasets.
   * Ideal for real-time data or infinite scroll.

---

### Example: Offset-based Pagination in a Node.js Backend (MongoDB)

Here’s how you can implement basic offset-based pagination using Express and Mongoose.

#### Schema (e.g., BlogPost)

```js
const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
```

#### Route with Pagination

```js
const express = require('express');
const BlogPost = require('./models/BlogPost');
const router = express.Router();

// GET /posts?page=1&limit=10
router.get('/posts', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const skip = (page - 1) * limit;

    const posts = await BlogPost.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await BlogPost.countDocuments();

    res.json({
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
      posts,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});
```

---

### Optional: Cursor-based Pagination (for better performance with real-time data)

```js
// GET /posts?after=<lastPostId>&limit=10
router.get('/posts-cursor', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const after = req.query.after;

  let query = {};
  if (after) {
    query = { _id: { $lt: after } }; // Posts before this ID
  }

  try {
    const posts = await BlogPost.find(query)
      .sort({ _id: -1 })
      .limit(limit);

    res.json({
      nextCursor: posts.length > 0 ? posts[posts.length - 1]._id : null,
      posts,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});
```

---

### Summary

| Method       | Use Case                          | Pros                  | Cons                        |
| ------------ | --------------------------------- | --------------------- | --------------------------- |
| Offset-based | Simpler use cases, small datasets | Easy to implement     | Slow for high offset values |
| Cursor-based | Real-time feeds, large datasets   | Efficient, consistent | Slightly more complex logic |

