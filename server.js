const express = require('express');
const path = require('path');
const { initDB, waitForDB } = require('./db/database');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

initDB();

// Health check for Railway
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

app.listen(PORT, () => {
  console.log(`Hip Opening Challenge running at http://localhost:${PORT}`);
});
