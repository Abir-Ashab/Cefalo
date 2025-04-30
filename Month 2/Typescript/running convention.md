Install `ts-node` and TypeScript. If it is done already to that device no need to do it again.
   ```bash
   npm install -g ts-node typescript
   ```

## Way-1
1. Add the following **tsconfig.json** file in your directory where the ts file is located.
    ```js
    {
    "compilerOptions": {
        "module": "CommonJS", // or "ESNext"
        "target": "ESNext",
        "moduleResolution": "node",
        "esModuleInterop": true
    }
    }
    ```
2. Run your TypeScript file directly:
   ```bash
   ts-node basic.ts
   ```

## Way-2
1. Run your TypeScript file directly:
   ```bash
   tsc basic.ts; node basic.js
   ```
   This step doesn't require **tsconfig.json**