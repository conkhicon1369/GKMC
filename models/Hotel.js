const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  city:        { type: String, required: true },
  address:     { type: String },
  description: { type: String },
  stars:       { type: Number, min: 1, max: 5, default: 3 },
  amenities:   [String],
  images:      [String],
  status:      { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hotel', hotelSchema);
