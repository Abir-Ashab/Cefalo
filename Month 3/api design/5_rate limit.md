### Rate Limiting

**Rate limiting** is a technique used to control how many requests a client can make to a server within a specific time window. It's commonly used to:

* **Prevent abuse** (e.g., spamming login attempts).
* **Protect APIs** from being overloaded.
* **Ensure fair usage** among users.

---

### Common Rate Limiting Strategies

1. **Fixed Window**: Limit per time window (e.g., 100 requests per 15 minutes).
2. **Sliding Log Window**: Track timestamps of each request (more accurate but resource-intensive).
3. **Token Bucket / Leaky Bucket**: More flexible; allows bursts and then refills over time.

---

### Example: Rate Limiting in a Node.js Backend using `express-rate-limit`

#### Step 1: Install the middleware

```bash
npm install express-rate-limit
```

#### Step 2: Apply it to your routes

```js
const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

// Apply a global rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    status: 429,
    error: 'Too many requests. Please try again later.'
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
});

app.use(limiter); // apply to all routes

// Sample route
app.get('/', (req, res) => {
  res.send('Hello! You are under the rate limit.');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

---

### Optional: Apply Rate Limiting to Specific Routes Only

```js
// Rate limit login route (e.g., 5 attempts per 15 min)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    status: 429,
    error: 'Too many login attempts. Try again in 15 minutes.'
  },
});

app.post('/login', loginLimiter, (req, res) => {
  // login logic
});
```

---

### Optional: Use Redis Store for Distributed Rate Limiting

If you are running your backend in multiple instances, in-memory limits won't sync. You can use Redis for consistent rate limiting.

```bash
npm install rate-limit-redis ioredis
```

```js
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');

const redisClient = new Redis();

const limiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
  windowMs: 1 * 60 * 1000,
  max: 10,
});
```

---

### Summary

| Strategy     | Best For                     | Pros                            | Cons                          |
| ------------ | ---------------------------- | ------------------------------- | ----------------------------- |
| Fixed Window | Simple apps                  | Easy to implement               | Small burst may bypass limit  |
| Sliding Log  | APIs needing precise control | Very accurate                   | Requires storage per request  |
| Token Bucket | Bursty traffic, flexibility  | Allows burst + consistent limit | Slightly complex to implement |

