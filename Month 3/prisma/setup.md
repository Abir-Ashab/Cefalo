- Run the postgres server by **pgAdmin 4** 
- Go to **https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-prismaPostgres** to setup prisma and postgres
- Go next-next to perform migration
- Download prisma extension in VS Code for coloring the schema and getting suggestions
- install **ts-node** by **npm i ts-node-dev --save-dev**
- And then in **packege.json** add this 
    ```js
    "scripts": {
        "start": "ts-node-dev --respawn --transpile-only ./src/index.ts"
    },
    ```
- Start everything by creating a **src/index.ts**
- Run the project by **npm start**
- You can see the prisma studio by **npx prisma studio**
- Jekono kichu create korle sheta must **data** er bhitor diye pathaite hobe (look index.ts)