## NestJS Layers and Their Responsibilities

### 1. **`main.ts`** (Application Bootstrap)

- **Job**: Entry point of the app
- Creates the Nest application instance
- Applies global middleware, pipes, guards, filters, etc.
- Starts the server with `app.listen(...)`

---

### 2. **Controller**

- **Job**: Handle incoming HTTP requests and delegate tasks to the service
- Routes (GET, POST, PUT, DELETE, etc.)
- Validates input (via DTO + Validation Pipe)
- Returns response (could be JSON, status code, etc.)

Think of it like:

> “Request handler that maps to business logic”

---

### 3. **Service**

- **Job**: Core **business logic** layer
- Contains all reusable logic (e.g., CRUD operations)
- Called by the controller
- Can talk to repositories/databases

Think of it like:

> “The brains behind the controller”

---

### 4. **DTO + Validation Pipe**

- **Job**: Data transfer & validation
- Define how incoming data should look using DTO (Data Transfer Object) classes
- `ValidationPipe` ensures request data matches the DTO schema
- Helps prevent invalid/malicious input

Think of it like:

> “The security guard for input data”

---

### 5. **Middleware**

- **Job**: Execute code **before** the request hits the controller
- Used for logging, request modification, auth token parsing, etc.
- Can be applied globally or per-route

Think of it like:

> “Gatekeeper at the door”

---

### 6. **Guards**

- **Job**: Determine **access control**
- Return `true` to allow or `false` to block a request
- Commonly used for:

  - Auth checks (JWT, API key)
  - Role-based access control

Think of it like:

> “Bouncer checking your ID”

---

### 7. **Interceptors**

- **Job**: Wrap around the request-response cycle
- Use cases:

  - Logging
  - Response formatting
  - Measuring execution time
  - Transforming output

Think of it like:

> “Middleware but more powerful and post-processing-aware”

---

### 8. **Exception Filters**

- **Job**: Catch & format errors
- Customizes error messages and HTTP response codes
- You can create custom exception filters or use built-in ones like `NotFoundException`, `BadRequestException`, etc.

Think of it like:

> “Error handler that makes your app fail gracefully”

---

## Example Request Flow

```
Client → Middleware → Guard → Interceptor (before) → Pipe → Controller → Service
                    → Interceptor (after) → Response
                           ↑
                    Exception Filter (if error)
```

---
