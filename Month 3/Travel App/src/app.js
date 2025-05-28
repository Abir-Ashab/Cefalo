const express = require('express');
const { initialize, getConnectionInfo } = require('./database');

const app = express();

app.use(express.json());

// Health check endpoint with database status
app.get('/health', async (req, res, next) => {
  try {
    const dbInfo = getConnectionInfo();
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      database: dbInfo
    });
  } catch (error) {
    next(error);
  }
});

// Initialize database connection
const initializeApp = async () => {
  try {
    await initialize();
    console.log('Application initialized successfully');
  } catch (error) {
    console.error('Application initialization failed:', error.message);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  const { disconnect } = require('./database');
  await disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...');
  const { disconnect } = require('./database');
  await disconnect();
  process.exit(0);
});

module.exports = { app, initializeApp };