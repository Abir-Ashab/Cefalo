### 1. Install knex and psql driver
`npm install knex pg`

### 2. Initialize Knex
`npx knex init`

This creates a knexfile.js which holds your database config.

### 3. Configure knexfile.js like the following
```js
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '312889',
      database: 'mydb'
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};
```
### 4. Create migration
For Javascript: `npx knex migrate:make create_users_table`

For Typescript: `knex migrate:make migration_name -x ts`

This will create a migration file under `./migrations`.

### 5. Edit the generated file like the following
```js
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id');
    table.string('name');
    table.string('email').unique();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
```

### 6. Migrate the migration file

To run the latest migration just type `npx knex migrate:latest`.

Here is how every `migrate`works:
- `up:` called during `knex migrate:latest` 
- `down:` called during `knex migrate:rollback`
- `npx knex migrate:rollback --all` to Roll back all migrtion files.
- `npx knex migrate:rollback --step=2` to Roll back a specific number of batches.

In **Knex**, a **batch** is a group of migration files that are applied together **in one `migrate:latest` command**. For Example:

Imagine you have 3 migration files:

```
20240527_create_users_table.js
20240528_create_posts_table.js
20240529_add_email_to_users.js
```

You run:

```bash
npx knex migrate:latest
```

Knex applies **all 3** (since none were applied before), and assigns them to **Batch 1**.

Now your `_knex_migrations` table looks like:

| id | name                               | batch | migration\_time     |
| -- | ---------------------------------- | ----- | ------------------- |
| 1  | 20240527\_create\_users\_table.js  | 1     | 2024-05-27 12:00:00 |
| 2  | 20240528\_create\_posts\_table.js  | 1     | 2024-05-27 12:00:01 |
| 3  | 20240529\_add\_email\_to\_users.js | 1     | 2024-05-27 12:00:02 |


So when apply rollback, Knex checks the **last batch number (1)** and rolls back **only** the files in that batch — in **reverse order**. And with step=1, it will rollback all migrations.

### 7. Change migration files

If you **change an existing migration file**, here's what happens: **Knex will NOT re-run the modified migration file** automatically. Because Knex tracks migrations using the `_knex_migrations` table. Once a migration is marked as “already run” in that table, Knex **skips it** — even if you’ve edited the file! Here is how can solve these:


#### Option 1: **Create a new migration** (Recommended)

* Just create a new migration file to modify your schema.

```bash
npx knex migrate:make add_column_to_users
```

* In that file, add code to update the schema (e.g., `table.string('new_column')`)
* Run:

```bash
npx knex migrate:latest
```

#### Option 2: **Rollback and re-run the migration** (Dev-only, not reommended in production level)

If you're in development and want to re-run the same migration file:

1. Rollback:

   ```bash
   npx knex migrate:rollback
   ```

2. Then run again:

   ```bash
   npx knex migrate:latest
   ```

**Caution:** This rolls back **all** migrations from the latest batch — not just one file.

---

### Option 3: **Manually delete from `_knex_migrations` table** 

You can run a SQL query to delete that file’s record from `_knex_migrations`, then run `migrate:latest` again:

```sql
DELETE FROM _knex_migrations WHERE name = '20240527123000_create_users_table.js';
```

Then run:

```bash
npx knex migrate:latest
```

### 8. How to check current migration file

To check which **migration files have been run (i.e., your current state)** in Knex, you can do it in two main ways:

---

### 1. **Look in the `_knex_migrations` table (via pgAdmin or SQL)**
### 2. **Use the Knex CLI to see status**

Run this command:

```bash
npx knex migrate:status
```

It will show you something like the following: 
```bash
Using environment: development
Found 3 Completed Migration file/files.
20250527061239_create_users_table.js
20250528063314_users.js
20250528063535_test_users.js
Found 1 Pending Migration file/files.
20250528065139_another_user.js
```

Where the first name consist of the timestamps, so the recent one in `Completed Migration file/files` denotes the current one.


