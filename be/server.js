const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*',
}));
app.use(express.json());

// ✅ CONNECT DATABASE
mongoose.connect('mongodb+srv://demomongo:passworddemo@cluster0.bvy1owa.mongodb.net/Newdb?appName=Cluster0')
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

const Author = mongoose.model('Author', authorSchema, 'authors');

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

const commentSchema = new mongoose.Schema({
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: false },
  username: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema, 'comments');


// ===================== ROUTES =====================

app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ FIX: Mount các router files đầy đủ chức năng
//    (thay vì viết inline thiếu route)
const articlesRouter = require('./routes/articles');
const authorsRouter = require('./routes/authors');
const commentsRouter = require('./routes/comments');

app.use('/api/articles', articlesRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/comments', commentsRouter);


// ===================== START SERVER =====================
app.listen(5000, () => console.log('Server running on port 5000'));