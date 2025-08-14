## Other Common Interactive Rebase Workflows

### 1. Reordering Commits

You can change the order of commits to make your history more logical.

#### Start interactive rebase

Decide how many commits back you want to reorder, then:

```bash
git rebase -i HEAD~N
```
Replace `N` with the number of commits you want to view.

#### Reorder in the editor

In the opened editor, move the lines up or down to reorder commits. For example:

```
pick a1b2c3 Feature A
pick d4e5f6 Feature B
pick 123abc Feature C
```

To move "Feature C" before "Feature B":

```
pick a1b2c3 Feature A
pick 123abc Feature C
pick d4e5f6 Feature B
```

Save and close the editor by pressing `Esc`, then type `:wq` and press `Enter`. Resolve any conflicts if prompted.

---

### 2. Editing a Commit Message

You can change the message of any commit.

#### Start interactive rebase

```bash
git rebase -i HEAD~N
```

#### Mark commit for editing

Change `pick` to `reword` (or `r`) for the commit you want to edit:

```
pick a1b2c3 Feature A
reword d4e5f6 Typo fix
pick 123abc Feature C
```

Save and close. Git will open an editor for the commit message. Edit as needed, then save and exit.

---

### 3. Splitting a Commit

Break a single commit into multiple smaller commits.

#### Start interactive rebase

```bash
git rebase -i HEAD~N
```

#### Mark commit for editing

Change `pick` to `edit` for the commit you want to split:

```
pick a1b2c3 Feature A
edit d4e5f6 Large commit to split
pick 123abc Feature C
```

Save and close. When Git stops at the commit:

```bash
git reset HEAD^
```

Now, your changes are unstaged. Stage and commit them in smaller pieces:

```bash
git add <file1>
git commit -m "Part 1"
git add <file2>
git commit -m "Part 2"
```

Continue the rebase:

```bash
git rebase --continue
```

---

### 4. Dropping a Commit

Remove a commit from history.

#### Start interactive rebase

```bash
git rebase -i HEAD~N
```

#### Remove the line

In the editor, delete the line of the commit you want to drop (by double-clicking `d`):

```
pick a1b2c3 Feature A
pick d4e5f6 Buggy commit   # <-- delete this line
pick 123abc Feature C
```

Save and close. The commit will be removed.

---

### 5. Fixing Up Commits

Combine a fix or small change into an earlier commit without editing the commit message.

#### Start interactive rebase

```bash
git rebase -i HEAD~N
```

#### Mark commit for fixup

Change `pick` to `fixup` (or `f`) for the commit you want to merge into the previous one:

```
pick a1b2c3 Initial feature
fixup d4e5f6 Minor fix
```

Save and close. The fix will be merged into the previous commit, discarding the fix's commit message.

---

**Note:** After any interactive rebase that rewrites history, use `git push --force-with-lease` to update the remote branch safely.

