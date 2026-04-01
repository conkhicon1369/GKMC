const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Thay YOUR_MONGODB_URI bằng connection string của bạn
mongoose.connect('mongodb://localhost:27017/news_db')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// ===================== MODELS =====================

const authorSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  email: String,
  avatar: String,
  bio: String,
}, { _id: false });

const Author = mongoose.model('Author', authorSchema);

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  summary: String,
  content: String,
  thumbnail: String,
  category: String,         // Thời sự | Kinh tế | Thể thao | Giải trí | Công nghệ
  tags: [String],
  authorId: Number,
  views: { type: Number, default: 0 },
  status: { type: String, default: 'published' },  // published | draft
  publishedAt: { type: Date, default: Date.now },
});

const Article = mongoose.model('Article', articleSchema);

const commentSchema = new mongoose.Schema({
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
  username: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

// ===================== ROUTES =====================

// Import routes
const articlesRouter = require('./routes/articles');
const authorsRouter = require('./routes/authors');
const commentsRouter = require('./routes/comments');

app.use('/api/articles', articlesRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/comments', commentsRouter);

app.listen(5000, () => console.log('Server running on port 5000'));
