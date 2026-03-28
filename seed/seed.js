const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User    = require('../models/User');
const Hotel   = require('../models/Hotel');
const Room    = require('../models/Room');
const Booking = require('../models/Booking');
const Review  = require('../models/Review');

async function seed() {
  mongoose.connect('mongodb+srv://demomongo:passworddemo@cluster0.bvy1owa.mongodb.net/QLBooking?appName=Cluster0')
  console.log('✅ Kết nối MongoDB - Database: QLBooking');

  // Xóa dữ liệu cũ
  await Promise.all([
    User.deleteMany(), Hotel.deleteMany(),
    Room.deleteMany(), Booking.deleteMany(), Review.deleteMany()
  ]);
  console.log('🗑  Đã xóa dữ liệu cũ');

  // ===== USERS =====
  const adminPass = await bcrypt.hash('admin123', 10);
  const userPass  = await bcrypt.hash('user123', 10);

  const [admin, user1, user2] = await User.insertMany([
    {
      fullName: 'Admin Hotel', email: 'admin@hotel.com',
      password: adminPass, phone: '0900000001',
      address: 'Đà Nẵng', role: 'admin'
    },
    {
      fullName: 'Nguyễn Văn A', email: 'a@gmail.com',
      password: userPass, phone: '0123456789',
      address: 'Đà Nẵng', role: 'user'
    },
    {
      fullName: 'Ngọc Huyền', email: 'huyen@gmail.com',
      password: userPass, phone: '0987654321',
      address: 'Hà Nội', role: 'user'
    }
  ]);
  console.log('👤 Tạo users xong');

  // ===== HOTELS =====
  const [h1, h2, h3, h4] = await Hotel.insertMany([
    {
      name: 'Sunrise Hotel', city: 'Nha Trang',
      address: '123 Trần Phú, Nha Trang',
      description: 'Khách sạn 4 sao gần biển, view đẹp',
      stars: 4,
      amenities: ['wifi', 'hồ bơi', 'nhà hàng', 'gym'],
      images: ['sunrise1.jpg'], status: 'active'
    },
    {
      name: 'Grand City Hotel', city: 'Đà Nẵng',
      address: '45 Bạch Đằng, Đà Nẵng',
      description: 'Khách sạn sang trọng trung tâm thành phố',
      stars: 5,
      amenities: ['wifi', 'spa', 'nhà hàng', 'bar'],
      images: ['grand1.jpg'], status: 'active'
    },
    {
      name: 'Royal Plaza', city: 'Hồ Chí Minh',
      address: '10 Lê Lợi, Quận 1, TP.HCM',
      description: 'Khách sạn 5 sao trung tâm Sài Gòn',
      stars: 5,
      amenities: ['wifi', 'hồ bơi', 'spa', 'nhà hàng', 'phòng gym'],
      images: ['royal1.jpg'], status: 'active'
    },
    {
      name: 'Skyline Hotel', city: 'Hà Nội',
      address: '88 Hoàn Kiếm, Hà Nội',
      description: 'Khách sạn view hồ Hoàn Kiếm tuyệt đẹp',
      stars: 4,
      amenities: ['wifi', 'nhà hàng', 'bãi đỗ xe'],
      images: ['skyline1.jpg'], status: 'active'
    }
  ]);
  console.log('🏨 Tạo hotels xong');

  // ===== ROOMS =====
  const rooms = await Room.insertMany([
    {
      hotelId: h1._id, roomType: 'Deluxe Ocean View',
      pricePerNight: 1500000, capacity: 2,
      quantity: 10, availableRooms: 6,
      size: 35, description: 'Phòng Deluxe view biển, trang bị đầy đủ tiện nghi cao cấp',
      amenities: ['wifi', 'điều hòa', 'minibar', 'ban công', 'TV màn hình phẳng'],
      images: ['room1.jpg']
    },
    {
      hotelId: h2._id, roomType: 'Family Suite',
      pricePerNight: 2200000, capacity: 4,
      quantity: 5, availableRooms: 3,
      size: 60, description: 'Suite gia đình rộng rãi, 2 phòng ngủ riêng biệt',
      amenities: ['wifi', 'bếp nhỏ', 'máy giặt', 'phòng khách riêng'],
      images: ['room2.jpg']
    },
    {
      hotelId: h3._id, roomType: 'Executive Room',
      pricePerNight: 1800000, capacity: 2,
      quantity: 8, availableRooms: 5,
      size: 40, description: 'Phòng Executive tầng cao, view thành phố ban đêm tuyệt đẹp',
      amenities: ['wifi', 'điều hòa', 'minibar', 'bồn tắm', 'dịch vụ phòng 24h'],
      images: ['room3.jpg']
    },
    {
      hotelId: h4._id, roomType: 'Standard Room',
      pricePerNight: 900000, capacity: 2,
      quantity: 20, availableRooms: 12,
      size: 25, description: 'Phòng tiêu chuẩn sạch sẽ, tiện nghi cơ bản đầy đủ',
      amenities: ['wifi', 'điều hòa', 'TV'],
      images: ['room4.jpg']
    },
    {
      hotelId: h1._id, roomType: 'Luxury Suite',
      pricePerNight: 3000000, capacity: 2,
      quantity: 3, availableRooms: 1,
      size: 80, description: 'Suite sang trọng nhất, view panorama toàn bộ bãi biển',
      amenities: ['wifi', 'bồn jacuzzi', 'ban công riêng', 'butler service', 'minibar'],
      images: ['room5.jpg']
    },
    {
      hotelId: h2._id, roomType: 'Twin Room',
      pricePerNight: 1000000, capacity: 2,
      quantity: 12, availableRooms: 8,
      size: 30, description: '2 giường đơn, phù hợp cho bạn bè hoặc đồng nghiệp',
      amenities: ['wifi', 'điều hòa', 'minibar'],
      images: ['room6.jpg']
    },
    {
      hotelId: h3._id, roomType: 'Superior Room',
      pricePerNight: 1000000, capacity: 2,
      quantity: 15, availableRooms: 9,
      size: 32, description: 'Phòng Superior hiện đại, đầy đủ tiện nghi',
      amenities: ['wifi', 'điều hòa', 'hồ bơi chung', 'điều hòa'],
      images: ['room7.jpg']
    },
    {
      hotelId: h4._id, roomType: 'Budget Room',
      pricePerNight: 500000, capacity: 1,
      quantity: 30, availableRooms: 20,
      size: 18, description: 'Phòng kinh tế giá rẻ, sạch sẽ, phù hợp du lịch tiết kiệm',
      amenities: ['wifi', 'quạt', 'tủ đồ khóa'],
      images: ['room8.jpg']
    }
  ]);
  console.log('🚪 Tạo rooms xong');

  // ===== BOOKINGS =====
  await Booking.insertMany([
    {
      userId: user1._id, hotelId: h1._id, roomId: rooms[0]._id,
      guestName: 'Nguyễn Văn A', guestPhone: '0123456789', guestEmail: 'a@gmail.com',
      checkInDate: new Date('2026-05-10'), checkOutDate: new Date('2026-05-12'),
      roomCount: 1, totalPrice: 3000000,
      status: 'confirmed', paymentStatus: 'paid'
    },
    {
      userId: user2._id, hotelId: h2._id, roomId: rooms[1]._id,
      guestName: 'Ngọc Huyền', guestPhone: '0987654321', guestEmail: 'huyen@gmail.com',
      checkInDate: new Date('2026-06-01'), checkOutDate: new Date('2026-06-03'),
      roomCount: 1, totalPrice: 4400000,
      status: 'pending', paymentStatus: 'unpaid'
    },
    {
      hotelId: h3._id, roomId: rooms[2]._id,
      guestName: 'Trần Minh Khoa', guestPhone: '0911222333', guestEmail: 'khoa@gmail.com',
      checkInDate: new Date('2026-04-15'), checkOutDate: new Date('2026-04-18'),
      roomCount: 2, totalPrice: 10800000,
      status: 'confirmed', paymentStatus: 'paid'
    }
  ]);
  console.log('📋 Tạo bookings xong');

  // ===== REVIEWS =====
  await Review.insertMany([
    {
      userId: user1._id, hotelId: h1._id,
      rating: 5, comment: 'Phòng đẹp và sạch sẽ, view biển tuyệt vời, dịch vụ chu đáo'
    },
    {
      userId: user2._id, hotelId: h2._id,
      rating: 4, comment: 'Khách sạn tốt, phòng thoáng mát và đầy đủ tiện nghi. Nhân viên thân thiện'
    }
  ]);
  console.log('⭐ Tạo reviews xong');

  console.log('\n✅ Seed dữ liệu hoàn tất!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔑 Tài khoản Admin: admin@hotel.com / admin123');
  console.log('👤 Tài khoản User:  a@gmail.com / user123');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━');

  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('❌ Lỗi seed:', err);
  process.exit(1);
});
