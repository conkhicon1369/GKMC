# 🏨 Hotel Booking Website

Website đặt phòng khách sạn — Node.js + Express + MongoDB + EJS

## Cấu Trúc Project

```
QLBooking/
├── app.js                  # Entry point
├── .env                    # Cấu hình môi trường
├── package.json
├── models/
│   ├── User.js             # Collection users
│   ├── Hotel.js            # Collection hotels
│   ├── Room.js             # Collection rooms
│   ├── Booking.js          # Collection bookings
│   └── Review.js           # Collection reviews
├── routes/
│   ├── index.js            # Trang chủ + tìm phòng (YC 1, 3)
│   ├── rooms.js            # Chi tiết phòng (YC 2)
│   ├── bookings.js         # Đặt phòng (YC 4)
│   ├── admin.js            # CRUD phòng + DS đặt phòng (YC 5, 6)
│   └── auth.js             # Đăng nhập / Đăng ký
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── index.ejs           # Trang chủ
│   ├── rooms/
│   │   └── detail.ejs      # Chi tiết phòng
│   ├── bookings/
│   │   ├── new.ejs         # Form đặt phòng
│   │   └── success.ejs     # Xác nhận thành công
│   ├── admin/
│   │   ├── dashboard.ejs
│   │   ├── rooms/
│   │   │   ├── index.ejs   # Danh sách phòng
│   │   │   ├── new.ejs     # Thêm phòng
│   │   │   └── edit.ejs    # Sửa phòng
│   │   └── bookings/
│   │       └── index.ejs   # DS khách đặt phòng
│   └── auth/
│       ├── login.ejs
│       └── register.ejs
├── middleware/
│   └── auth.js             # Kiểm tra đăng nhập / quyền admin
├── public/
│   └── css/style.css
└── seed/
    └── seed.js             # Tạo dữ liệu mẫu
```

## Hướng Dẫn Cài Đặt & Chạy

### Yêu cầu
- Node.js >= 16
- MongoDB đang chạy tại `localhost:27017`

### Bước 1: Cài thư viện
```bash
cd QLBooking
npm install
```

### Bước 2: Cấu hình .env
```
MONGODB_URI=mongodb://localhost:27017/QLBooking
SESSION_SECRET=hotel_booking_secret_key_2024
PORT=3000
```

### Bước 3: Seed dữ liệu mẫu
```bash
npm run seed
```

### Bước 4: Chạy server
```bash
npm start
# hoặc để auto-reload:
npm run dev
```

Mở trình duyệt: **http://localhost:3000**

---

## Tài Khoản Demo

| Vai trò | Email | Mật khẩu |
|---------|-------|----------|
| Admin   | admin@hotel.com | admin123 |
| User    | a@gmail.com | user123 |

---

## Các Chức Năng Đã Xây Dựng

| # | Yêu cầu | Route |
|---|---------|-------|
| 1 | Trang chủ hiển thị danh sách phòng | `GET /` |
| 2 | Chi tiết phòng | `GET /rooms/:id` |
| 3 | Tìm phòng còn trống theo ngày | `GET /?checkIn=&checkOut=` |
| 4 | Đặt phòng | `GET/POST /bookings/new/:roomId` |
| 5 | CRUD phòng (Thêm/Sửa/Xóa) | `GET/POST/PUT/DELETE /admin/rooms` |
| 6 | Xem danh sách khách đặt phòng | `GET /admin/bookings` |

---

## Database: QLBooking — Collections

- **users** — Tài khoản khách hàng và admin
- **hotels** — Thông tin khách sạn
- **rooms** — Phòng của từng khách sạn
- **bookings** — Đặt phòng của khách hàng
- **reviews** — Đánh giá của khách
