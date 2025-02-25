const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/', auth, async (req, res) => {
  try {
    const allowedUpdates = ['profile'];
    const updates = {};

    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/fitness-profile', auth, async (req, res) => {
  try {
    const {
      age,
      height,
      weight,
      fitnessLevel,
      goals,
      injuries,
      availableTime
    } = req.body;

    const profileData = {
      age: age || req.user.profile?.age,
      height: height || req.user.profile?.height,
      weight: weight || req.user.profile?.weight,
      fitnessLevel: fitnessLevel || req.user.profile?.fitnessLevel || 'beginner',
      goals: goals || req.user.profile?.goals || [],
      injuries: injuries || req.user.profile?.injuries || [],
      availableTime: availableTime || req.user.profile?.availableTime
    };

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { profile: profileData } },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: 'Fitness profile updated successfully',
      user
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;