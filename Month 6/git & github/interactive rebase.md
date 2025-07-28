### interactive rebase

`git rebase -i <commit hash>` lets you combine multiple commits into one.

1. Start an interactive rebase
```bash
git rebase -i HEAD~n
```

2. Choose the commits you want to squash
In the editor that opens, you'll see a list of commits. Change the word `pick` to `squash` (or `s`) for the commits you want to combine.

3. Save and close
If your default editor is Vim:

- Press `Esc`
- Type `:wq`
- Press `Enter`