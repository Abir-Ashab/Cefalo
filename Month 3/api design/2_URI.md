## **Core Principles of URI Design**

### 1. **Uniqueness & Permanence**

* Each URI must represent **a unique data object**.
* URIs should be **permanent** — choose wisely at the beginning and avoid changes.
* If a change is needed, use a **301 redirect** to retain SEO value and avoid broken links.

### 2. **Human-Friendly**

* URIs should be **readable, meaningful, and short**.
* Avoid obscure identifiers like `/product/23`; prefer `/product/ballpoint-pen`.
* Apply the **"speech-friendly" test** — can someone say the link out loud easily?

---

## **Best Practices**

### 3. **Consistency**

* Maintain a consistent format throughout the site.
* If switching from old structure, always use **301 redirects**.

### 4. **Hackability**

* Structure URIs to allow users to "hack" them intuitively.

  * Example: `/events/2025/05/19` → `/events/2025/05` → `/events/2025`

### 5. **Keyword-Rich**

* Include **relevant keywords** that reflect the content.
* Helps with **SEO** and improves user clarity.

  * E.g., `/blog/2025/05/19/trip-best-buy-memory-cards`

---

## **Technical Guidelines**

### 6. **No Technology Leakage**

* Don’t expose implementation: avoid `.php`, `.html`, `.aspx`, etc.
* Exception: Use suffixes like `.json`, `.rss`, `.atom` when specifying formats.

### 7. **No `www`**

* Drop `www` unless necessary; redirect `www.domain.com` → `domain.com`.

### 8. **URI Structure Format**

```plaintext
domain.com/[key info]/[object-name]/?[modifiers]
```

* Use **descending hierarchy**:

  * `/news/tech/2025/05/19/google-announces-android`

### 9. **Lowercase Only**

* URIs should be **completely lowercase**.
* Redirect mixed-case to lowercase if possible.

### 10. **Actions in URI**

* Actions like `edit`, `delete`, `view` can be added:

  * Non-destructive actions: use `GET`
  * Destructive actions: use `POST`

---

## **Slug Formatting (URI-Friendliness)**

When using strings like titles in a URI:

* Convert to **lowercase**
* Replace accented characters (`é` → `e`)
* Replace spaces with hyphens
* Remove or replace special characters (`!@#$%` → `-`)
* Collapse multiple hyphens into one
* Avoid using `%20` or URI escapes unless unavoidable

---

##  **Creative Touch: Sentence-like URIs**

Make URIs feel like natural language:

```
site.com/authored/digging-into-uri-design/
site.com/likes/uri-best-practices/
site.com/thinks/this-guide/is/helpful/
```

---

## Summary

A great URI should be:

* **Unique**
* **Permanent**
* **Readable**
* **Hackable**
* **Consistent**
* **Keyword-rich**
* **Technology-agnostic**
* **Lowercase and clean**

---