### Edit Recent Commits

`git commit --amend` lets you edit the most recent commit message or add changes to the last commit. For example:

```bash
git commit --amend
```
This opens the commit message editor for the last commit. 

`git rebase -i` can also be used to fix commit messages in earlier commits by changing `pick` to `reword` or `edit`. For example:
```bash
git rebase -i <commit>
```