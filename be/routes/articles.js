const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Article = mongoose.model('Article');

// GET tất cả bài viết (có filter theo category, status)
router.get('/', async (req, res) => {
  try {
    const { category, status, limit = 20, page = 1 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    else filter.status = 'published';

    const articles = await Article.find(filter)
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Article.countDocuments(filter);
    res.json({ articles, total, page: Number(page) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET bài viết theo slug
router.get('/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).json({ error: 'Không tìm thấy bài viết' });

    // Tăng view
    article.views += 1;
    await article.save();

    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST tạo bài viết mới
router.post('/', async (req, res) => {
  try {
    // Tạo slug tự động từ title
    const slug = req.body.title
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D')
      .replace(/[^a-z0-9\s]/g, '')
      .trim().replace(/\s+/g, '-')
      + '-' + Date.now();

    const article = new Article({ ...req.body, slug });
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT cập nhật bài viết
router.put('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE xóa bài viết
router.delete('/:id', async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Đã xóa bài viết' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET bài viết nổi bật (views cao nhất)
router.get('/featured/top', async (req, res) => {
  try {
    const articles = await Article.find({ status: 'published' })
      .sort({ views: -1 })
      .limit(5);
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
