##  How `ValidationPipe` Works Step-by-Step

Pipes have two typical use cases:

- transformation: transform input data to the desired form (e.g., from string to integer)
- validation: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception

###  1. **You define a DTO class with validation decorators**

Example: `create-user.dto.ts`

```ts
import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  name: string;

  @IsEmail()
  email: string;
}
```

> Here you're saying: name must be a string (3–20 chars), and email must be valid.

---

###  2. **You enable validation globally**

In `main.ts`:

```ts
app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
```

* `new ValidationPipe()` tells Nest to apply validation on all DTOs automatically.
* `{ whitelist: true }` removes any properties **not defined in the DTO**.

---

###  3. **When a request comes in**, Nest:

* Checks if the handler (e.g., `@Post('users')`) expects a DTO (e.g., `CreateUserDto`)
* Transforms plain request JSON into a class instance using `class-transformer`
* Validates it using `class-validator` decorators
* Throws `BadRequestException` if the validation fails

---

### Example Flow

You send this POST request:

```json
{
  "name": "Al",
  "email": "not-an-email",
  "extra": "should be stripped"
}
```

Results:

* `name` is too short → error
* `email` is invalid → error
* `extra` is stripped if `whitelist: true` → 

Nest returns a `400 Bad Request` with this, bacause here we don't need custom error handler.

```json
{
  "statusCode": 400,
  "message": [
    "name must be longer than or equal to 3 characters",
    "email must be an email"
  ],
  "error": "Bad Request"
}
```

---

