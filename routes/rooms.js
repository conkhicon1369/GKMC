const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const Hotel = require('../models/Hotel');
const Review = require('../models/Review');

// Chi tiết phòng (yêu cầu 2)
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('hotelId');
    if (!room) {
      req.flash('error', 'Không tìm thấy phòng');
      return res.redirect('/');
    }
    const reviews = await Review.find({ hotelId: room.hotelId }).populate('userId').limit(5);
    res.render('rooms/detail', { room, reviews });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;
