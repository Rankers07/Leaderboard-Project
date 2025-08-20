const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET sorted leaderboard
router.get('/', async (req, res, next) => {
  try {
    const leaderboard = await User.find().sort({ totalPoints: -1 }).select('name avatar totalPoints');
    res.json(leaderboard);
  } catch (err) { next(err); }
});

module.exports = router;
