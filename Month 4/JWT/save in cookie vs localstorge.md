### Cookies vs LocalStorage for JWT Storage

| Aspect                                     | Cookies                                                                                                                                 | LocalStorage                                                                                |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **Access from JavaScript**                 | Can be **HttpOnly** (not accessible to JavaScript)                                                                                      | Always accessible via JavaScript (`window.localStorage`)                                    |
| **XSS (Cross-Site Scripting) Risk**        | Lower risk if `HttpOnly` flag is set, because malicious scripts **cannot read or steal** the token                                      | Higher risk, because if an attacker injects JS, they can easily read tokens in localStorage |
| **CSRF (Cross-Site Request Forgery) Risk** | Cookies are sent automatically with every request, so they can be vulnerable to CSRF unless you add protections (SameSite, CSRF tokens) | Tokens in localStorage must be explicitly attached to requests, so less vulnerable to CSRF  |
| **Secure Flag**                            | Cookies can be marked `Secure` to be sent only over HTTPS                                                                               | localStorage has no equivalent security flag                                                |
| **Ease of Use**                            | Cookies are automatically sent with HTTP requests, no need to manually add tokens                                                       | You have to manually add the token to request headers (e.g., `Authorization`)               |

---

