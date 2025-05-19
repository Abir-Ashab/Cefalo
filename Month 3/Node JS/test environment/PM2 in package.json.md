### What is **PM2**?

**PM2** (Process Manager 2) is a **production-grade process manager** for Node.js applications.

---

### Why use PM2?

Running a Node.js app with `node index.js` is fine during development, but in **production**, you want more control and reliability. PM2 offers features like:

| Feature                | Description                                               |
| ---------------------- | --------------------------------------------------------- |
| **Auto-Restart**       | Automatically restarts your app if it crashes or exits.   |
| **Background Process** | Runs your app in the background (like a service).         |
| **Monitoring**         | Shows CPU & memory usage, logs, and process status.       |
| **Clustering**         | Uses all CPU cores to run multiple instances of your app. |
| **Log Management**     | Keeps logs and errors in files for easy debugging.        |
| **Startup Scripts**    | Keeps your app alive even after server restarts.          |

---

### Basic Example

```bash
pm2 start index.js
```

Starts your app (`index.js`) and keeps it running in the background. If it crashes, PM2 will restart it automatically.

---

### Install PM2

To use PM2, install it globally:

```bash
npm install -g pm2
```

---

### Useful PM2 Commands

```bash
pm2 start index.js          # Start your app
pm2 list                    # List all running processes
pm2 logs                    # View logs
pm2 stop index              # Stop your app
pm2 restart index           # Restart your app
pm2 delete index            # Remove app from PM2
pm2 save                    # Save current process list (for startup)
pm2 startup                 # Generate startup script (for auto start after reboot)
```

---

### When should you use PM2?

* When deploying Node.js apps to production.
* When you need automatic restarts, clustering, or easy log management.
* When hosting on a VPS (like DigitalOcean, AWS EC2, etc.).
