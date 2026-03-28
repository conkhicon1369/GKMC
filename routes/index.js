const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');

// Trang chủ - danh sách phòng
router.get('/', async (req, res) => {
  try {
    const { checkIn, checkOut, city } = req.query;

    let rooms = await Room.find({ availableRooms: { $gt: 0 } })
      .populate('hotelId')
      .limit(8);

    // Lọc theo thành phố
    if (city) {
      rooms = rooms.filter(r => r.hotelId && r.hotelId.city.toLowerCase().includes(city.toLowerCase()));
    }

    // Tìm phòng còn trống theo ngày (yêu cầu 3)
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      // Lấy các roomId đã bị book trong khoảng ngày này
      const bookedRoomIds = await Booking.distinct('roomId', {
        status: { $ne: 'cancelled' },
        $or: [
          { checkInDate: { $lt: checkOutDate }, checkOutDate: { $gt: checkInDate } }
        ]
      });

      rooms = await Room.find({
        _id: { $nin: bookedRoomIds },
        availableRooms: { $gt: 0 }
      }).populate('hotelId');

      if (city) {
        rooms = rooms.filter(r => r.hotelId && r.hotelId.city.toLowerCase().includes(city.toLowerCase()));
      }
    }

    res.render('index', { rooms, checkIn, checkOut, city });
  } catch (err) {
    console.error(err);
    res.render('index', { rooms: [], checkIn: null, checkOut: null, city: null });
  }
});

module.exports = router;
