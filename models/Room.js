const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  hotelId:        { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  roomType:       { type: String, required: true },
  pricePerNight:  { type: Number, required: true },
  capacity:       { type: Number, default: 2 },
  quantity:       { type: Number, default: 1 },
  availableRooms: { type: Number, default: 1 },
  size:           { type: Number },
  description:    { type: String },
  images:         [String],
  amenities:      [String]
});

module.exports = mongoose.model('Room', roomSchema);
