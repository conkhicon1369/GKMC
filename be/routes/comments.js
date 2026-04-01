const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Comment = mongoose.model('Comment');

// GET tất cả bình luận của 1 bài viết
router.get('/:articleId', async (req, res) => {
  try {
    const comments = await Comment.find({ articleId: req.params.articleId })
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST thêm bình luận
router.post('/', async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE xóa bình luận
router.delete('/:id', async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Đã xóa bình luận' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
