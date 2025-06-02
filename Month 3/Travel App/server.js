const express = require('express');
const { initialize } = require('./src/database');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    await initialize();
    console.log('Application initialized successfully');
  } catch (error) {
    console.error('Application initialization failed:', error.message);
    process.exit(1);
  }
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
