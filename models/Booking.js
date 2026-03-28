const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hotelId:       { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  roomId:        { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  guestName:     { type: String, required: true },
  guestPhone:    { type: String, required: true },
  guestEmail:    { type: String, required: true },
  checkInDate:   { type: Date, required: true },
  checkOutDate:  { type: Date, required: true },
  roomCount:     { type: Number, default: 1 },
  totalPrice:    { type: Number, required: true },
  status:        { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
  createdAt:     { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
