const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Room = require('../models/Room');

// Form đặt phòng (yêu cầu 4)
router.get('/new/:roomId', async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId).populate('hotelId');
    if (!room) return res.redirect('/');
    res.render('bookings/new', { room });
  } catch (err) {
    res.redirect('/');
  }
});

// Xử lý đặt phòng
router.post('/', async (req, res) => {
  try {
    const { roomId, guestName, guestPhone, guestEmail, checkInDate, checkOutDate, roomCount } = req.body;

    const room = await Room.findById(roomId).populate('hotelId');
    if (!room) {
      req.flash('error', 'Phòng không tồn tại');
      return res.redirect('/');
    }

    if (room.availableRooms < parseInt(roomCount)) {
      req.flash('error', 'Số phòng yêu cầu vượt quá số phòng còn trống');
      return res.redirect(`/rooms/${roomId}`);
    }

    const nights = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
    if (nights <= 0) {
      req.flash('error', 'Ngày trả phòng phải sau ngày nhận phòng');
      return res.redirect(`/bookings/new/${roomId}`);
    }

    const totalPrice = room.pricePerNight * parseInt(roomCount) * nights;

    const booking = new Booking({
      userId:       req.session.user ? req.session.user._id : null,
      hotelId:      room.hotelId._id,
      roomId:       room._id,
      guestName,
      guestPhone,
      guestEmail,
      checkInDate:  new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      roomCount:    parseInt(roomCount),
      totalPrice
    });

    await booking.save();

    // Cập nhật số phòng còn trống
    room.availableRooms -= parseInt(roomCount);
    await room.save();

    req.flash('success', `Đặt phòng thành công! Mã đặt phòng: ${booking._id}`);
    res.redirect(`/bookings/success/${booking._id}`);
  } catch (err) {
    console.error(err);
    req.flash('error', 'Có lỗi xảy ra, vui lòng thử lại');
    res.redirect('/');
  }
});

// Trang xác nhận thành công
router.get('/success/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('roomId')
      .populate('hotelId');
    res.render('bookings/success', { booking });
  } catch (err) {
    res.redirect('/');
  }
});

module.exports = router;
