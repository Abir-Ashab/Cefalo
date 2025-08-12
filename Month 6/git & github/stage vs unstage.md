### Staging

* **Staging** means you tell Git: “These changes are ready to be committed.”
* You add modified files or parts of files to the staging area with:

  ```bash
  git add <filename>
  ```
* After staging, when you run `git commit`, Git commits only the changes that are in the staging area.

---

### Unstage 

* **Unstaging** means you remove changes from the staging area, so they won’t be included in the next commit.
* Your actual file changes remain in your working directory (you don’t lose the changes, just unstage them).
* To unstage a file, you use:

  ```bash
  git restore --staged <filename>
  ```
* This moves the file out of the staging area but keeps the changes in the file itself.

---

### Quick workflow example:

1. Modify a file, say `app.js`. The changes are **unstaged** by default.
2. Stage the changes:

   ```bash
   git add app.js
   ```
3. If you change your mind and want to unstage it:

   ```bash
   git restore --staged app.js
   ```
4. Commit the staged changes:

   ```bash
   git commit -m "Update app.js"
   ```