const jwt = require('jsonwebtoken');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiU1VQRVJfQURNSU4iLCJlbWFpbCI6Im5pbG95LmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0._4uliCrunvT0Q8li0qCTwPDHXTo7OA5JyJQ-gurNZIM'; 

// Decode - no verification
const decoded = jwt.decode(token);
console.log('Decoded payload:', decoded);

// Verify - checks signature and expiration
jwt.verify(token, 'your-secret-key', (err, verifiedPayload) => {
  if (err) {
    console.error('Invalid token:', err.message);
  } else {
    console.log('Verified payload:', verifiedPayload);
  }
});
