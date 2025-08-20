require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const usersRoutes = require('./src/routes/users');
const claimsRoutes = require('./src/routes/claims');
const leaderboardRoutes = require('./src/routes/leaderboard');
const historyRoutes = require('./src/routes/history');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// connect to DB
const connectDB = require('./src/config/db');
connectDB();

// socket.io
const io = new Server(server, {
  cors: { origin: '*' }
});

// attach io to app so routes can use it (via req.app.get('io'))
app.set('io', io);

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.on('disconnect', () => console.log('Socket disconnected:', socket.id));
});

// routes
app.use('/api/users', usersRoutes);
app.use('/api/claims', claimsRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/history', historyRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
