Differences between `npm`, `npm -g`, and `npx`:

1. **npm**:

   * Used to install packages in your local project.
   * The installed package goes into the `node_modules` folder.
   * Example: `npm install <package-name>` installs the package locally, so it can be used in the current project.

2. **npm -g**:

   * Installs packages globally on your system.
   * The installed package is available globally, meaning it can be accessed from anywhere on your system (across all projects).
   * Example: `npm install -g <package-name>` installs the package globally, so you can use it in any project without installing it again.

3. **npx**:

   * A command runner that executes packages without permanently installing them.
   * Automatically installs a package temporarily if it’s not found and runs the command, then cleans up afterward.
   * Useful for running commands from tools that you don’t want to install globally or locally.
   * Example: `npx create-react-app <app-name>` runs `create-react-app` without permanently installing it.

In summary:

* **npm** installs locally to the project.
* **npm -g** installs globally on your system.
* **npx** runs commands from packages without permanent installation.
