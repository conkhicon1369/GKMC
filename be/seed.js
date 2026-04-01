/**
 * Script import dữ liệu mẫu vào MongoDB
 * Chạy: node seed.js
 */
const mongoose = require('mongoose');

// Dùng đúng connection string trong server.js của bạn
const MONGO_URI = 'mongodb+srv://demomongo:passworddemo@cluster0.bvy1owa.mongodb.net/news_db?appName=Cluster0';

const articleSchema = new mongoose.Schema({
  title: String, slug: { type: String, unique: true },
  summary: String, content: String, thumbnail: String,
  category: String, tags: [String], authorId: Number,
  views: { type: Number, default: 0 },
  status: { type: String, default: 'published' },
  publishedAt: { type: Date, default: Date.now },
});

const authorSchema = new mongoose.Schema({
  _id: Number, name: String, email: String, avatar: String, bio: String,
}, { _id: false });

const Article = mongoose.model('Article', articleSchema);
const Author = mongoose.model('Author', authorSchema);

const seedData = require('../database/seed.json');

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  // Xóa dữ liệu cũ
  await Article.deleteMany({});
  await Author.deleteMany({});
  console.log('Cleared old data');

  // Insert mới
  await Author.insertMany(seedData.authors);
  console.log(`Inserted ${seedData.authors.length} authors`);

  await Article.insertMany(seedData.articles);
  console.log(`Inserted ${seedData.articles.length} articles`);

  console.log('\n✅ Seed xong! Khởi động lại server: npm start');
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Lỗi seed:', err.message);
  process.exit(1);
});
