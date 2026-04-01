import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setArticles } from '../store/articleSlice';
import { setSelectedCategory, setLoading } from '../store/uiSlice';
import ArticleCard from '../components/ArticleCard';

const CATEGORY_ICONS = {
  'Thời sự': '📰',
  'Kinh tế': '💹',
  'Thể thao': '⚽',
  'Giải trí': '🎬',
  'Công nghệ': '💻',
};

export default function CategoryPage() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { articles } = useSelector(s => s.article);
  const { loading } = useSelector(s => s.ui);

  useEffect(() => {
    dispatch(setSelectedCategory(category));
    const fetch = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get('/api/articles', { params: { category, limit: 30 } });
        dispatch(setArticles(res.data));
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetch();
  }, [category, dispatch]);

  const icon = CATEGORY_ICONS[category] || '📂';

  return (
    <div style={{ maxWidth: 1200, margin: '32px auto', padding: '0 16px' }}>
      <h2 style={{ fontSize: 26, marginBottom: 24, color: '#c0392b' }}>
        {icon} {category}
      </h2>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#888', padding: 48 }}>Đang tải...</p>
      ) : articles.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888', padding: 48 }}>Chưa có bài viết trong mục này.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 24,
        }}>
          {articles.map(a => <ArticleCard key={a._id} article={a} />)}
        </div>
      )}
    </div>
  );
}
