process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    // It's a good idea to exit after logging
    process.exit(1); // graceful exit
});

undefinedFunctionCall(); // First uncaught error

// This line likely won't run after the above exception
let json = '{ "age": 30 }';
let user = JSON.parse(json);
if (!user.name) {
    throw new Error("Incomplete data: no name");
}
