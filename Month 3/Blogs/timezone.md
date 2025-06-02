## **1. Time Zones in JavaScript Date**

JavaScript `Date` objects **always store time internally in UTC** (Coordinated Universal Time). However:

* **Methods like `toString()` and `toLocaleString()`** show the **local time zone** (based on your computer settings).
* **Methods like `toUTCString()` and `toISOString()`** return the time in **UTC**.

---

### Common Time Zones

| Time Zone      | Description                                    | Example Offset |
| -------------- | ---------------------------------------------- | -------------- |
| **UTC**        | Coordinated Universal Time                     | `+00:00`       |
| **GMT**        | Greenwich Mean Time (often same as UTC)        | `+00:00`       |
| **Local Time** | Based on user system (e.g., Dhaka: BST)        | `+06:00`       |
| **Offsets**    | Time zones are usually shown as GMT/UTC±hh\:mm | `GMT+0600`     |


