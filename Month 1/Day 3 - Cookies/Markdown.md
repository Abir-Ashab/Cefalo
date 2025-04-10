## 1990s – 
The internet lacked memory—HTTP was stateless. Websites couldn't remember users between pages, leading to frustrating experiences. This changed when Lou Montulli at Netscape introduced **HTTP cookies (1994)** with session management, allowing websites to keep users logged in and track shopping carts.  

### 1. Server-Side Cookies (Setting Cookies from the Server)  
When a user visits a website and logs in, the server needs a way to remember that user across different pages. This is where cookies come in:  

1. The user logs in by sending credentials (e.g., username & password).  
2. The server verifies the credentials and creates a session for the user.  
3. The server sends a `Set-Cookie` header in the HTTP response, instructing the browser to store a cookie.  

#### Example: Setting a Cookie  
The `session_id=abc123` is now stored in the user's browser and helps the server recognize the user in future requests.  
```http
HTTP/1.1 200 OK
Set-Cookie: session_id=abc123
```

### 2. Client-Side Retrieval (Sending Cookies Automatically)  
Now that the cookie is stored in the browser, it will be automatically included in future requests to the same website.  

#### Example: Browser Sends the Cookie with a Request  
```http
GET /profile HTTP/1.1
Host: www.example.com
Cookie: session_id=abc123
```
- The browser automatically adds the cookie to every request sent to `www.example.com`.  
- The server reads the cookie and verifies that `session_id=abc123` belongs to a valid logged-in user.  
- The user is shown their personalized profile page without needing to log in again.  

### Limitations  
- **4KB storage limit** restricted data storage.  
- **Sent with every request**, increasing network load.  
- **Security risks** (e.g., stolen session cookies).  
- Cookies were vulnerable to **JavaScript-based attacks (XSS)**.  

---

## 2000s – 
Cookies became essential for **personalization and tracking**. Advertisers saw an opportunity to track users across websites using **third-party cookies**.  

### Key Features Added  
- **User preferences stored in cookies** (e.g., themes, language settings).  
```http
Set-Cookie: user=JohnDoe
Set-Cookie: theme=dark
```
- **Persistent cookies** introduced for long-term tracking.  
```http
Set-Cookie: id=xyz123; Expires=Thu, 31 Dec 2025 23:59:59 GMT;
```
- **Session cookies** (deleted when the browser closes) became standard.  
- **HttpOnly (2002)**: Prevented JavaScript from reading cookies, reducing XSS attacks.  
- **Secure flag**: Ensured cookies were only sent over HTTPS.  

### Limitations  
- Websites were vulnerable to **CSRF attacks**.  
- Developers realized cookies weren’t ideal for client-side data storage due to their **small size and network overhead**.  
- No standard way to **enforce consent**; companies often ignored it.  

---

## 2010s – 
- **localStorage & sessionStorage (HTML5)**: Provided better alternatives for storing user preferences without sending data with every request.  
- **IndexedDB**: Allowed complex, structured data storage.  
- **GDPR (2018) & CCPA (2020) Regulations**: Required websites to obtain user consent for non-essential cookies.  

### Managing Cookies with JavaScript  
#### Example: Setting Cookies via JavaScript  
```js
document.cookie = "user=JohnDoe";
document.cookie = "theme=dark";
```
#### Example: Reading and Updating Cookies  
```js
console.log(document.cookie); // "user=JohnDoe; theme=dark"
document.cookie = "theme=light";
```

### The `SameSite` Attribute (2016)  
Introduced to **limit cross-site cookie sharing** and **prevent CSRF attacks**.  

#### **SameSite=Strict (Strongest Security)**  
- Cookies **are not sent** with any cross-site requests.  
- Only sent when navigating within the same site.  

Example:  
```http
Set-Cookie: sessionID=xyz123; SameSite=Strict; Secure
```

#### **SameSite=Lax (Balanced Security, Default Policy)**  
- Cookies **are sent** with same-site requests and **top-level navigation** (e.g., clicking a link).  
- Cookies **are NOT sent** with cross-site subrequests (images, iframes, AJAX).  

Example Scenario:  
1. You are on `https://google.com`.  
2. You click a link:  
   ```html
   <a href="https://cookie-rouge.vercel.app">Visit Cookie Site</a>
   ```
3. This opens `https://cookie-rouge.vercel.app` in your browser.  
   - **Since this is a top-level navigation, the browser sends the SameSite=Lax cookie.**  
4. Your browser loads an image:  
   ```http
   GET /img HTTP/1.1
   Host: cookie-rouge.vercel.app
   ```
   - **Since this is a cross-site request and NOT a top-level navigation, the SameSite=Lax cookie is NOT sent.**  

#### **SameSite=None (Allows Cross-Site Cookies)**  
- Cookies **are sent** with all requests, even cross-site.  
- Must include a **Secure** attribute (HTTPS required).  
- Used when cookies need to be available across different sites (e.g., third-party services).  

## Visualizing `SameSite` Attributes with Cookies  

The four `SameSite` attributes were tested using the following setup:  

- **Test URL:** [https://cookie-si4u.vercel.app](https://cookie-si4u.vercel.app)  
- **Backend URL (where cookies are set):** [https://cookie-rouge.vercel.app](https://cookie-rouge.vercel.app)  
- **Image Source:** [https://cookie-rouge.vercel.app/img](https://cookie-rouge.vercel.app/img)  

### Viewing Cookies in Chrome Developer Tools  
To check whether cookies are received:  

1. Open **Chrome Developer Tools** by pressing `F12`.  
2. Navigate to **Application** → **Cookies** → `https://cookie-si4u.vercel.app/`.  
3. If cookies from `https://cookie-rouge.vercel.app/` are present, the image should be visible.  

### Conditions for Image Visibility  
The image is served from `https://cookie-rouge.vercel.app/img`. Whether the browser displays the image depends on whether cookies are included in the request. The behavior of cookies is determined by the `SameSite` attribute:  

- **`SameSite=Strict`**  
  - Cookies are not sent with any cross-site requests.  
  - The image will not load because the authentication cookie is blocked.  

- **`SameSite=Lax` (Default Setting)**  
  - Cookies are sent only with **top-level navigation** (e.g., clicking a link).  
  - Cookies are not sent with **subresource requests** (e.g., images, iframes).  
  - The image will not load when embedded in another page.  

- **`SameSite=None` (Requires `Secure` Attribute)**  
  - Cookies are sent with all requests, including cross-site ones.  
  - The image will load successfully as the authentication cookie is included.  

- **No `SameSite` Attribute (Defaults to `Lax`)**  
  - Cookies are not sent with image requests.  
  - The image will not load unless a top-level navigation occurs first.  

### Conclusion  
The image will only be visible when cookies from `https://cookie-rouge.vercel.app/` are successfully included in the request to `https://cookie-rouge.vercel.app/img`. This happens under the following conditions:  

1. The cookie has `SameSite=None` and the `Secure` attribute.  
2. The browser allows third-party cookies.  

Otherwise, the image request will be blocked due to the absence of authentication cookies.  

### Limitations  
- **Third-party cookies were used excessively for tracking.**  
- **Advertisers relied heavily on third-party cookies for tracking.**  

---

## 2020s – 
Privacy concerns escalated, and browsers took aggressive steps to restrict tracking:  

- **SameSite=Lax by default (2020)**: Improved CSRF protection. Chrome enforces `SameSite=Lax` by default, restricting cross-site cookies for top-level navigation.  
- **Chrome, Firefox, and Safari blocked third-party cookies by default.**  
- **Google announced plans to phase out third-party cookies (~2024).**  
- **SameSite=Strict** became common for high-security environments (e.g., banking).  