# Vim Basics - Essential Commands

## 📝 Vim Modes

### **Normal Mode** (Default mode)
- Press `Esc` to enter Normal mode from any other mode
- Used for navigation and commands

### **Insert Mode** 
- Press `i` to enter Insert mode
- Used for typing/editing text

### **Visual Mode**
- Press `v` to enter Visual mode
- Used for selecting text

### **Command Mode**
- Press `:` to enter Command mode
- Used for executing commands like save, quit, etc.

---

## 🚀 Getting Started

### **Opening/Creating Files**
```bash
vim filename.txt      # Open or create a file
vim +n filename       # Open file at line n
vim +/pattern file    # Open file and search for pattern
```

### **Exiting Vim**
```
:q          # Quit (only works if no changes)
:q!         # Quit without saving changes
:w          # Save file
:wq         # Save and quit
:x          # Save and quit (same as :wq)
ZZ          # Save and quit (Normal mode)
ZQ          # Quit without saving (Normal mode)
```

---

## 🧭 Navigation Commands

### **Basic Movement**
```
h           # Move left
j           # Move down  
k           # Move up
l           # Move right

←↓↑→        # Arrow keys also work
```

### **Word Movement**
```
w           # Move to beginning of next word
b           # Move to beginning of previous word
e           # Move to end of current word
W           # Move to next WORD (ignores punctuation)
B           # Move to previous WORD
E           # Move to end of WORD
```

### **Line Movement**
```
0           # Move to beginning of line
$           # Move to end of line
^           # Move to first non-blank character
g_          # Move to last non-blank character
```

### **Screen Movement**
```
H           # Move to top of screen
M           # Move to middle of screen
L           # Move to bottom of screen
Ctrl+f      # Page down
Ctrl+b      # Page up
Ctrl+d      # Half page down
Ctrl+u      # Half page up
```

### **File Movement**
```
gg          # Go to first line
G           # Go to last line
nG          # Go to line n (e.g., 10G goes to line 10)
:n          # Go to line n
%           # Jump to matching bracket/parenthesis
```

---

## ✏️ Editing Commands

### **Entering Insert Mode**
```
i           # Insert before cursor
a           # Insert after cursor
I           # Insert at beginning of line
A           # Insert at end of line
o           # Open new line below and insert
O           # Open new line above and insert
```

### **Deleting Text**
```
x           # Delete character under cursor
X           # Delete character before cursor
dw          # Delete word
dd          # Delete entire line
D           # Delete from cursor to end of line
d$          # Delete from cursor to end of line
d0          # Delete from cursor to beginning of line
ggVGd       # Delete entire file content (go to top, select all, delete)
```

### **Copying (Yanking)**
```
yy          # Copy entire line
yw          # Copy word
y$          # Copy from cursor to end of line
y0          # Copy from cursor to beginning of line
```

### **Pasting**
```
p           # Paste after cursor
P           # Paste before cursor
```

### **Cutting (Delete + Copy)**
```
dd          # Cut entire line
dw          # Cut word
d$          # Cut from cursor to end of line
```

### **Undo/Redo**
```
u           # Undo last action
Ctrl+r      # Redo
U           # Undo all changes on current line
```

---

## 🔍 Search and Replace

### **Searching**
```
/pattern    # Search forward for pattern
?pattern    # Search backward for pattern
n           # Go to next search result
N           # Go to previous search result
*           # Search for word under cursor (forward)
#           # Search for word under cursor (backward)
```

### **Search and Replace**
```
:s/old/new          # Replace first occurrence in current line
:s/old/new/g        # Replace all occurrences in current line
:%s/old/new/g       # Replace all occurrences in entire file
:%s/old/new/gc      # Replace all with confirmation
:n,ms/old/new/g     # Replace in lines n to m
```

---

## 📋 Visual Mode Commands

### **Entering Visual Mode**
```
v           # Character-wise visual mode
V           # Line-wise visual mode
Ctrl+v      # Block-wise visual mode
```

### **Visual Mode Operations**
```
d           # Delete selected text
y           # Copy selected text
c           # Delete selected text and enter insert mode
>           # Indent selected text
<           # Unindent selected text
```

---

## 📁 File Operations

### **Working with Multiple Files**
```
:e filename     # Edit another file
:split file     # Split window horizontally
:vsplit file    # Split window vertically
Ctrl+w+w       # Switch between windows
Ctrl+w+h/j/k/l # Navigate between windows
:close         # Close current window
```

### **Tabs**
```
:tabnew file    # Open file in new tab
:tabn          # Next tab
:tabp          # Previous tab
:tabclose      # Close current tab
```

---

## 🔧 Useful Commands

### **Line Numbers**
```
:set number     # Show line numbers
:set nonumber   # Hide line numbers
:set nu         # Short form for number
:set nonu       # Short form for nonumber
```

### **Indentation**
```
>>          # Indent current line
<<          # Unindent current line
5>>         # Indent 5 lines
gg=G        # Auto-indent entire file
```

### **Case Changes**
```
~           # Toggle case of character under cursor
guu         # Convert line to lowercase
gUU         # Convert line to uppercase
```

### **Joining Lines**
```
J           # Join current line with next line
gJ          # Join lines without adding space
```

---

## ⚡ Advanced Tips

### **Repeating Commands**
```
.           # Repeat last command
5dd         # Delete 5 lines
3yy         # Copy 3 lines
10j         # Move down 10 lines
```

### **Marks and Jumps**
```
ma          # Set mark 'a' at current position
'a          # Jump to mark 'a'
''          # Jump back to previous position
Ctrl+o      # Jump to older position
Ctrl+i      # Jump to newer position
```

### **Macros**
```
qa          # Start recording macro 'a'
q           # Stop recording macro
@a          # Execute macro 'a'
@@          # Execute last macro
```

---

## 🎯 Common Workflows

### **Quick Edit Workflow**
```
1. vim file.txt     # Open file
2. /searchterm      # Find what you want to edit
3. i                # Enter insert mode
4. (make changes)   # Edit the text
5. Esc              # Return to normal mode
6. :wq              # Save and quit
```

### **Search and Replace Workflow**
```
1. :%s/old/new/gc   # Search and replace with confirmation
2. y/n/a/q          # Yes/No/All/Quit for each match
3. :w               # Save changes
```

### **Copy/Paste Workflow**
```
1. V                # Enter line visual mode
2. (select lines)   # Use j/k to select multiple lines
3. y                # Copy selected lines
4. p                # Paste lines
```

---

## 🆘 Emergency Commands

### **When You're Stuck**
```
Esc Esc     # Make sure you're in normal mode
:q!         # Quit without saving (if something went wrong)
u           # Undo if you made a mistake
Ctrl+c      # Cancel current command
```

### **Help System**
```
:help       # Open help
:help topic # Get help on specific topic
:q          # Close help window
```

---

## 📚 Memory Tips

### **Movement Mnemonics**
- **h** = left (leftmost letter)
- **j** = down (looks like down arrow)
- **k** = up (opposite of j)
- **l** = right (rightmost letter)

### **Command Patterns**
- **d** = delete, **y** = yank (copy), **c** = change
- **w** = word, **$** = end of line, **0** = beginning of line
- Combine: **dw** (delete word), **y$** (copy to end), **c0** (change to beginning)

---

## 🏁 Quick Reference Card

```
BASIC SURVIVAL KIT:
i     → Insert mode
Esc   → Normal mode  
:wq   → Save and quit
:q!   → Quit without saving
u     → Undo
/text → Search for "text"
dd    → Delete line
yy    → Copy line
p     → Paste
```

**Remember**: Practice makes perfect! Start with these basics and gradually add more commands to your toolkit. 🚀