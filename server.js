const express = require('express');
const path = require('path');
const { initDB, waitForDB } = require('./db/database');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

initDB();

// Health check for Railway - wait for DB so traffic only routes when ready
app.get('/health', async (req, res) => {
  await waitForDB();
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Ensure DB is ready before handling API requests
app.use('/api', async (req, res, next) => {
  await waitForDB();
  next();
});

app.use('/api', apiRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log(`Hip Opening Challenge running at http://localhost:${PORT}`);
});

// Graceful shutdown - let Railway stop cleanly
function shutdown(signal) {
  console.log(`${signal} received, shutting down gracefully...`);
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
  // Force exit after 5s if connections don't close
  setTimeout(() => process.exit(0), 5000);
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
