const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/login', (req, res) => res.render('auth/login'));
router.get('/register', (req, res) => res.render('auth/register'));

router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, phone, address } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      req.flash('error', 'Email đã được sử dụng');
      return res.redirect('/auth/register');
    }
    const user = new User({ fullName, email, password, phone, address });
    await user.save();
    req.flash('success', 'Đăng ký thành công! Vui lòng đăng nhập');
    res.redirect('/auth/login');
  } catch (err) {
    req.flash('error', 'Có lỗi xảy ra');
    res.redirect('/auth/register');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      req.flash('error', 'Email hoặc mật khẩu không đúng');
      return res.redirect('/auth/login');
    }
    req.session.user = { _id: user._id, fullName: user.fullName, email: user.email, role: user.role };
    req.flash('success', `Chào mừng, ${user.fullName}!`);
    res.redirect(user.role === 'admin' ? '/admin' : '/');
  } catch (err) {
    req.flash('error', 'Có lỗi xảy ra');
    res.redirect('/auth/login');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
