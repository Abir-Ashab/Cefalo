## **RAM**

**RAM** stands for **Random Access Memory**. It is a type of **temporary memory** inside a computer, smartphone, or other electronic device.Think of RAM as wer device’s short-term memory:

* When we open apps, play games, or run websites — all the **active data** is stored in RAM.
* Once we're done (or power off the device), that data is **wiped**.

#### RAM in web apps

When we open a website:

* The **browser (Chrome, Firefox)** loads the HTML, JavaScript, etc. into **RAM**
* Any JavaScript variables, React states, React Query caches = live in **RAM**
* If we **reload the page**, all of that data is **cleared**

When we open a React app with a form:

* While typing — the inputs are stored in **RAM**
* If the browser crashes or we reload — unsaved form data is **lost**
* That’s because it was in **RAM**, not saved to disk


## **ROM**

**ROM** stands for **Read-Only Memory**. It is a type of **non-volatile memory** — meaning:

* It **retains data even when the device is powered off**
* It is mainly **read-only** (cannot or should not be changed often)
* It stores **permanent, essential instructions** for the computer or device

Here is a simple analogy:

| Memory Type | Analogy                                      |
| ----------- | -------------------------------------------- |
| RAM         | Whiteboard we write and erase on constantly |
| ROM         | Printed instruction manual (read-only)       |
| **CPU Cache** | Stuff in our hand/pocket (super quick access) |
| **RAM**       | Stuff on our desk (reachable, but slower)     |
| **SSD/HDD**   | Stuff in our drawer or cupboard (slowest)     |


ROM typically stores the **firmware** or **bootloader** (low-level software that controls hardware) of a device. For example:

* When we turn on wer computer, **ROM tells it how to load the operating system (OS)** from the hard drive
* In a washing machine or microwave — ROM stores the embedded software that runs the machine

Examples of ROM in use:

| Device           | What ROM does there                               |
| ---------------- | ------------------------------------------------- |
| Computer         | Stores BIOS or UEFI for booting                   |
| Smartphone       | Stores Android/iOS firmware (base system)         |
| Calculator       | Stores built-in functions and instructions        |
| Embedded Systems | Stores software in things like TVs, routers, etc. |