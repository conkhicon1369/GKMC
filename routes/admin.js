const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');
const { isAdmin } = require('../middleware/auth');

// Dashboard admin
router.get('/', isAdmin, async (req, res) => {
  const totalRooms    = await Room.countDocuments();
  const totalBookings = await Booking.countDocuments();
  const pendingBookings = await Booking.countDocuments({ status: 'pending' });
  res.render('admin/dashboard', { totalRooms, totalBookings, pendingBookings });
});

// ===================== CRUD PHÒNG (yêu cầu 5) =====================

// Danh sách phòng
router.get('/rooms', isAdmin, async (req, res) => {
  const rooms = await Room.find().populate('hotelId');
  const hotels = await Hotel.find({ status: 'active' });
  res.render('admin/rooms/index', { rooms, hotels });
});

// Form thêm phòng
router.get('/rooms/new', isAdmin, async (req, res) => {
  const hotels = await Hotel.find({ status: 'active' });
  res.render('admin/rooms/new', { hotels });
});

// Xử lý thêm phòng
router.post('/rooms', isAdmin, async (req, res) => {
  try {
    const { hotelId, roomType, pricePerNight, capacity, quantity, availableRooms, size, description, amenities } = req.body;
    const room = new Room({
      hotelId, roomType,
      pricePerNight: parseInt(pricePerNight),
      capacity: parseInt(capacity),
      quantity: parseInt(quantity),
      availableRooms: parseInt(availableRooms),
      size: parseInt(size),
      description,
      amenities: amenities ? amenities.split(',').map(a => a.trim()) : [],
      images: ['default-room.jpg']
    });
    await room.save();
    req.flash('success', 'Thêm phòng thành công');
    res.redirect('/admin/rooms');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Lỗi khi thêm phòng');
    res.redirect('/admin/rooms/new');
  }
});

// Form sửa phòng
router.get('/rooms/:id/edit', isAdmin, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    const hotels = await Hotel.find({ status: 'active' });
    res.render('admin/rooms/edit', { room, hotels });
  } catch (err) {
    res.redirect('/admin/rooms');
  }
});

// Xử lý sửa phòng
router.put('/rooms/:id', isAdmin, async (req, res) => {
  try {
    const { hotelId, roomType, pricePerNight, capacity, quantity, availableRooms, size, description, amenities } = req.body;
    await Room.findByIdAndUpdate(req.params.id, {
      hotelId, roomType,
      pricePerNight: parseInt(pricePerNight),
      capacity: parseInt(capacity),
      quantity: parseInt(quantity),
      availableRooms: parseInt(availableRooms),
      size: parseInt(size),
      description,
      amenities: amenities ? amenities.split(',').map(a => a.trim()) : []
    });
    req.flash('success', 'Cập nhật phòng thành công');
    res.redirect('/admin/rooms');
  } catch (err) {
    req.flash('error', 'Lỗi khi cập nhật phòng');
    res.redirect(`/admin/rooms/${req.params.id}/edit`);
  }
});

// Xóa phòng
router.delete('/rooms/:id', isAdmin, async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    req.flash('success', 'Xóa phòng thành công');
  } catch (err) {
    req.flash('error', 'Lỗi khi xóa phòng');
  }
  res.redirect('/admin/rooms');
});

// ===================== DANH SÁCH ĐẶT PHÒNG (yêu cầu 6) =====================
router.get('/bookings', isAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('roomId')
      .populate('hotelId')
      .sort({ createdAt: -1 });
    res.render('admin/bookings/index', { bookings });
  } catch (err) {
    res.render('admin/bookings/index', { bookings: [] });
  }
});

// Cập nhật trạng thái đặt phòng
router.put('/bookings/:id/status', isAdmin, async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status });
    req.flash('success', 'Cập nhật trạng thái thành công');
  } catch (err) {
    req.flash('error', 'Lỗi cập nhật trạng thái');
  }
  res.redirect('/admin/bookings');
});

module.exports = router;
