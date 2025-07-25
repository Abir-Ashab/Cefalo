## **CPU**

**CPU** stands for **Central Processing Unit**. It is the **“brain” of our computer** — responsible for:

* Executing all instructions (like calculations, decisions, moving data)
* Running our programs and operating system
* Interpreting and processing code (like our JavaScript, Python, etc.)
* Every time we Open an app, Run code, Load a website, The **CPU processes the instructions** from RAM or cache to do the jobs. These instructions tell the CPU to do things like:
    - Add two numbers
    - Move data from one place to another
    - Compare values
    - Jump to another instruction (e.g., if condition is true)

---

#### CPU Structure 

A CPU typically includes:

| Part                            | Role                                              |
| ------------------------------- | ------------------------------------------------- |
| **ALU (Arithmetic Logic Unit)** | Performs calculations and logic                   |
| **Control Unit**                | Directs operations, like what to fetch/execute    |
| **Registers**                   | Tiny, super-fast internal memory (like variables) |
| **Cache**                       | Special high-speed memory (explained below)       |

---

#### **CPU Cache**

The **CPU cache** is a **tiny, super-fast memory** inside or very close to the CPU. It stores **frequently-used data or instructions**, so the CPU doesn't have to fetch them from **RAM** (which is slower). So its purpose is basically to **Speed things up** by keeping important stuff close to the CPU. Here is a comparison:

| Without Cache                            | With Cache                      |
| ---------------------------------------- | ------------------------------- |
| CPU must ask RAM for everything (slower) | CPU checks cache first (faster) |
| Latency (delay) is higher                | Much faster response time       |

---

#### Levels of Cache

| Cache Level | Location                     | Size                 | Speed                    | Shared?   |
| ----------- | ---------------------------- | -------------------- | ------------------------ | --------- |
| **L1**      | Inside each CPU core         | Smallest (\~32KB)    | Fastest                  | No        |
| **L2**      | Also inside core (or nearby) | Medium (\~256KB-1MB) | Slower than L1           | Sometimes |
| **L3**      | Shared between all cores     | Larger (\~4MB-16MB)  | Slowest (but still fast) | Yes       |

So the CPU first checks:

1. **L1 Cache** → fastest
2. **L2**
3. **L3**
4. Then **RAM** (slower)
5. Then **SSD/HDD** (much slower)

---

#### How does the **CPU handle internal software usage**

* The CPU **does not directly “know” about software** like apps or files.
* Instead, it runs **machine instructions** provided by the operating system (OS).
* The **OS acts as a middleman** between software and hardware.
* When we run a program:

  1. The OS loads the program’s instructions (machine code) into **RAM**.
  2. The CPU fetches those instructions from RAM (using fetch-decode-execute cycle).
  3. The CPU executes those instructions step-by-step.

* The OS also manages:

  * **Memory allocation** (telling CPU where the program’s data is).
  * **Scheduling** (which program runs on CPU and when).
  * **Input/output operations** (reading files, writing to disk, interacting with devices).

---

## **C:, D:, E:** drives

* These are **drive letters** used in Windows operating systems. Our PC has one (or more) physical hard drives or SSDs installed. 
* The operating system (like Windows) takes that physical storage and divides it into parts called partitions.Each partition is then assigned a drive letter like C:, D:, E:.
* So even if we have only one physical drive, it can be split into multiple logical drives (partitions) to organize data better.
* These rives store **data permanently** — files, programs, system files, documents, etc.
* When we run software, the OS:

  1. Reads the program files from the drive (e.g., C:).
  2. Loads necessary instructions and data into RAM.
  3. The CPU executes the loaded program.
* Drives provide **persistent storage** (unlike RAM, which is temporary).

---

#### How they works together:

* When we click an app icon:

  * OS reads app files from **C: drive**.
  * Loads those files into **RAM**.
  * CPU executes the instructions from **RAM**.
* Files we save or install go back onto drives like **C: or D:**.

#### How does the CPU handle software internally

* The CPU itself **only executes low-level machine instructions** (bits of 0s and 1s).
* Software (like apps, OS) is compiled or interpreted into these instructions.
* The **Operating System (OS)** manages everything:

  * Loads program instructions from storage (like C: drive) into **RAM**.
  * Schedules the CPU to execute these instructions.
  * Handles memory, input/output, device management.
* The CPU repeatedly:

  * Fetches instructions from RAM,
  * Decodes and executes them,
  * Stores results,
  * Then moves to next instruction.

So software runs because the OS loads it into RAM and the CPU runs its instructions.
