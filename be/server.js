const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*', // cho phép tất cả (dễ test)
}));
app.use(express.json());

// ✅ CONNECT ĐÚNG DATABASE Newdb
mongoose.connect('mongodb+srv://demomongo:passworddemo@cluster0.bvy1owa.mongodb.net/Newdb?appName=Cluster0')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// ===================== MODELS =====================

// AUTHOR
const authorSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  email: String,
  avatar: String,
  bio: String,
}, { _id: false });

// ✅ chỉ định rõ collection
const Author = mongoose.model('Author', authorSchema, 'authors');


// ARTICLE
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  summary: String,
  content: String,
  thumbnail: String,
  category: String,
  tags: [String],
  authorId: Number,
  views: { type: Number, default: 0 },
  status: { type: String, default: 'published' },
  publishedAt: { type: Date, default: Date.now },
});

const Article = mongoose.model('Article', articleSchema, 'articles');


// COMMENT
const commentSchema = new mongoose.Schema({
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: false },
  username: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema, 'comments');


// ===================== ROUTES =====================

// test root
app.get('/', (req, res) => {
  res.send('API is running...');
});


// 👉 GET ALL ARTICLES
app.get('/api/articles', async (req, res) => {
  try {
    const data = await Article.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 👉 GET AUTHORS
app.get('/api/authors', async (req, res) => {
  try {
    const data = await Author.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 👉 GET COMMENTS
app.get('/api/comments', async (req, res) => {
  try {
    const data = await Comment.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ===================== START SERVER =====================
app.listen(5000, () => console.log('Server running on port 5000'));