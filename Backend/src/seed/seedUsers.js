/**
 * Run: npm run seed  (from backend folder)
 * It will add 10 default users (if they don't already exist)
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const defaultNames = [
  'Rahul', 'Kamal', 'Sanak', 'Bindas', 'Pritesh',
  'Mrs.Rajput', 'CoolBoy', 'Mystery', 'Devil', 'Aman'
];

const seed = async () => {
  try {
    await connectDB();
    for (const name of defaultNames) {
      const exists = await User.findOne({ name });
      if (!exists) {
        const avatar = `https://robohash.org/${encodeURIComponent(name)}.png?size=128x128`;
        await User.create({ name, avatar, totalPoints: Math.floor(Math.random() * 5) }); // small random init
        console.log('Added', name);
      } else {
        console.log('Already exists', name);
      }
    }
    console.log('Seeding done');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
