1. Install Nest CLI (only once)

```bash
npm install -g @nestjs/cli
```
Then install some basic things:

```bash
npm install class-validator class-transformer
```

2. create a project
```bash
nest new project-name
```
navigate to `cd user-crud`

3. Creates files under src/module_name/
```bash
nest g module module_name
nest g controller module_name
nest g service module_name
```

4. Implement codes and run by `npm run start:dev`