let date = new Date(0); 
console.log(date.toUTCString()); // "Thu, 01 Jan 1970 00:00:00 GMT"
console.log(date.toString());

let oneDayLater = new Date(24 * 60 * 60 * 1000);
console.log(oneDayLater.toUTCString()); // "Fri, 02 Jan 1970 00:00:00 GMT"

console.log(new Date(8.64e15).toString()); // "Sat Sep 13 275760 00:00:00 GMT+0000 (Coordinated Universal Time)"
console.log(new Date(8.64e15 + 1).toString()); // "Invalid Date”
