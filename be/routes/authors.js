const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Author = mongoose.model('Author');

// GET tất cả tác giả
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET 1 tác giả theo ID
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(Number(req.params.id));
    if (!author) return res.status(404).json({ error: 'Không tìm thấy tác giả' });
    res.json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST tạo tác giả
router.post('/', async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json(author);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
