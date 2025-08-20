const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) { next(err); }
});

// POST create user
router.post('/', async (req, res, next) => {
  try {
    const { name, avatar } = req.body;
    // Use provided avatar or auto-generate default via robohash
    const avatarUrl = avatar || `https://robohash.org/${encodeURIComponent(name)}.png?size=128x128`;
    const user = new User({ name, avatar: avatarUrl });
    await user.save();

    // Emit updated leaderboard
    const io = req.app.get('io');
    const updated = await User.find().sort({ totalPoints: -1 }).select('name avatar totalPoints');
    io.emit('leaderboardUpdated', updated);

    res.status(201).json(user);
  } catch (err) { next(err); }
});

module.exports = router;
