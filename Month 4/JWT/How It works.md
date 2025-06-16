1. **Login:**

   * User sends credentials.
   * Server validates and returns:

     * Short-lived **access token** (JWT).
     * Long-lived **refresh token** (usually a random string or JWT).

2. **Client stores tokens:**

   * Access token is stored (e.g., in memory or localStorage).
   * Refresh token is stored securely (e.g., HttpOnly cookie).

3. **Accessing Protected Resources:**

   * Client sends the access token with requests.
   * Server verifies it and processes requests.

4. **Access Token Expiration:**

   * When the access token expires, the client uses the refresh token to request a new access token.

5. **Refresh Token Endpoint:**

   * Client calls a special API endpoint (e.g., `/auth/refresh`) with the refresh token.
   * Server verifies the refresh token (e.g., checks validity, expiration, revocation).
   * If valid, server issues a new access token (and sometimes a new refresh token).
   * Client replaces the old access token with the new one and continues making requests.

6. **Logout or Refresh Token Revocation:**

   * On logout or suspicious activity, server invalidates the refresh token so it can no longer be used.

### Example Flow:

```
User Login:
  -> Server returns
     Access Token (expires in 15 min)
     Refresh Token (expires in 7 days)

Client makes API calls with Access Token

After 15 min:
  Access Token expired
  -> Client sends Refresh Token to /auth/refresh
  -> Server verifies refresh token
  -> Server returns new Access Token

Client continues using new Access Token
```

---

### Important Notes

* Refresh tokens should be stored securely (e.g., in an HttpOnly cookie to prevent JavaScript access).
* If a refresh token leaks, attacker can get new access tokens, so secure storage + rotation + revocation is important.
* Many implementations keep a server-side **refresh token whitelist or blacklist** to track issued tokens.
* Refresh tokens are usually not sent with every request — only when requesting new access tokens.

