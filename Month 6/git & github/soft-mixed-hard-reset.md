### `git reset`

* `git reset` moves the current **HEAD** pointer to a specified commit.
* It can also change the **staging area** and the **working directory** depending on the option (`--soft`, `--mixed`, `--hard`).
* It’s mainly used to undo commits or changes locally.

#### 1. `git reset --soft HEAD~1` (syntax: `git reset --soft <commit>`)

* Moves HEAD back by 1 commit. Don't just use git reset --soft without specifying a commit, it is syntax error.
* **Keeps** all changes staged and working directory untouched.
* It’s like “uncommitting” but ready to recommit immediately.

**Use when:** You want to change the last `commit message` or add more changes to that commit.

---

#### 2. `git reset --mixed HEAD~1` (syntax: `git reset --mixed <commit>`)

* Moves HEAD back by 1 commit. 
* Here we can use just `git reset`, which is similar to `git reset --mixed HEAD~1`
* **Unstages** changes that were in that commit (staging area cleared).
* Your changed files are still there in your working directory, but unstaged.

**Use when:** You want to undo a commit but keep your changes locally so you can edit the changed files before recommitting.

---

#### 3. `git reset --hard HEAD~1`

* Moves HEAD back by 1 commit.
* **Resets staging area and working directory** to exactly match that commit.
* **All uncommitted changes are lost forever** (unless you have backups or reflog).

**Use when:** You want to completely discard the last commit and any changes associated with it.

---

### Visual summary:

```
Commit history: A - B - C (HEAD)

After `git reset --soft HEAD~1`:
Commit history: A - B (HEAD)
Changes from commit C are still staged and files are unchanged.

After `git reset --mixed HEAD~1`:
Commit history: A - B (HEAD)
Changes from commit C are unstaged but files are unchanged.

After `git reset --hard HEAD~1`:
Commit history: A - B (HEAD)
Changes from commit C are discarded, working directory matches commit B exactly.
```
