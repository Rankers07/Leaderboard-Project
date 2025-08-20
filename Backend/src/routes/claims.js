const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// POST claim points for a user
router.post('/', async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'userId required' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const points = Math.floor(Math.random() * 10) + 1; // 1-10
    user.totalPoints += points;
    await user.save();

    await ClaimHistory.create({ user: user._id, points });

    // Emit updated leaderboard to all clients
    const io = req.app.get('io');
    const leaderboard = await User.find().sort({ totalPoints: -1 }).select('name avatar totalPoints');
    io.emit('leaderboardUpdated', leaderboard);

    res.json({ userId: user._id, points, totalPoints: user.totalPoints });
  } catch (err) { next(err); }
});

module.exports = router;
