**Lexical Scoping?**
- "Lexical" refers to the structure and position of code — essentially, where things are written in the source code.
- "Scoping" refers to the context or environment in which variables are accessible.

**How It Works**

When you define a function inside another function, the inner function has access to the variables of the outer function.  
This happens because the inner function was defined within that scope.

Think of it like a family:  
A child inherits properties from parents or grandparents (ancestors), but not from siblings or descendants.

---

**Key Insight**

Lexical scoping is determined by where a function is written, not where or when it is called.

In other words:  
A function “remembers” the variables from the place in the code where it was defined — even if it's called from somewhere else entirely.

This means:
- When a function is created, it locks in access to the variables around it (its lexical environment).
- This environment doesn’t change based on where the function is called.

---

Let me know if you want a code example to illustrate this.