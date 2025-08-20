const express = require('express');
const router = express.Router();
const ClaimHistory = require('../models/ClaimHistory');

// GET claim history
router.get('/', async (req, res, next) => {
  try {
    const history = await ClaimHistory.find().sort({ createdAt: -1 }).populate('user', 'name avatar');
    res.json(history);
  } catch (err) { next(err); }
});

module.exports = router;
