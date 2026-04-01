import { Link } from 'react-router-dom';

export default function ArticleCard({ article }) {
  const date = new Date(article.publishedAt).toLocaleDateString('vi-VN');
  return (
    <div style={{
      border: '1px solid #eee', borderRadius: 8, overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)', background: '#fff',
      transition: 'transform 0.2s',
    }}>
      {article.thumbnail && (
        <img
          src={article.thumbnail}
          alt={article.title}
          style={{ width: '100%', height: 180, objectFit: 'cover' }}
        />
      )}
      <div style={{ padding: '12px 16px' }}>
        <span style={{ background: '#c0392b', color: '#fff', fontSize: 11, padding: '2px 8px', borderRadius: 3 }}>
          {article.category}
        </span>
        <Link to={`/article/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 style={{ margin: '8px 0', fontSize: 16, lineHeight: 1.4 }}>{article.title}</h3>
        </Link>
        <p style={{ color: '#666', fontSize: 13, margin: '0 0 8px' }}>{article.summary}</p>
        <div style={{ fontSize: 12, color: '#999', display: 'flex', justifyContent: 'space-between' }}>
          <span>📅 {date}</span>
          <span>👁 {article.views} lượt xem</span>
        </div>
      </div>
    </div>
  );
}
