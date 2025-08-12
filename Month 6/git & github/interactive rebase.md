## Combining the Last Two Commits Using Interactive Rebase

### 1. View the commit history

Check recent commits to determine how far back you want to rebase:

```bash
git log --oneline
```

---

### 2. Start interactive rebase

Since the goal is to combine the last two commits, rebase the last two:

```bash
git rebase -i HEAD~2
```

---

### 3. Mark commits for squash

An editor (e.g., Vim) will open showing the last two commits:

```
pick a1b2c3 Commit message 1
pick d4e5f6 Commit message 2
```

Change the second `pick` to `squash` (or `s`):

```
pick a1b2c3 Commit message 1
squash d4e5f6 Commit message 2
```

This merges commit 2 into commit 1.

Save and close the editor.

---

### 4. Edit the commit message

Git will open another editor showing both commit messages, something like:

```
# This is a combination of 2 commits.
# The first commit’s message is:
Commit message 1

# The following commit message will also be included:
Commit message 2
```

Delete unnecessary lines and write the final combined commit message.
Example:

```
Combined: Git basics and save local changes
```

In Vim:

* Press `i` to enter Insert mode.
* Edit the text as needed.
* Press `Esc`, then type `:wq` and press Enter to save and exit.

---

### 5. Continue or finish rebase

If no conflicts occur, Git completes the rebase automatically.
If conflicts appear:

```bash
# Resolve conflicts in the affected files
git add <file>
git rebase --continue
```

---

### 6. Push the changes to the remote

Since history was rewritten, a normal push will fail. Use force push:

```bash
git push --force
```

For a safer alternative that prevents overwriting others’ work:

```bash
git push --force-with-lease
```

---

### Summary of Key Commands

```bash
git log --oneline
git rebase -i HEAD~2
# Change pick to squash in editor
# Edit commit message in next editor
git push --force
```

---
