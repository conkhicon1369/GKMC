import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setArticles, setCurrentPage } from '../store/articleSlice';
import { setLoading } from '../store/uiSlice';
import ArticleCard from '../components/ArticleCard';

const ARTICLES_PER_PAGE = 9;

export default function HomePage() {
  const dispatch = useDispatch();
  const { articles, total, currentPage } = useSelector(s => s.article);
  const { selectedCategory, searchQuery, loading } = useSelector(s => s.ui);

  useEffect(() => {
    const fetchArticles = async () => {
      dispatch(setLoading(true));
      try {
        const params = { page: currentPage, limit: ARTICLES_PER_PAGE };
        if (selectedCategory && selectedCategory !== 'Tất cả') {
          params.category = selectedCategory;
        }

        // ✅ FIX: Dùng URL tương đối để Vite proxy hoạt động
        //    (bỏ 'https://YOUR-5000-URL' placeholder)
        const res = await axios.get('/api/articles', { params });

        let articlesData = res.data.articles;

        if (searchQuery) {
          articlesData = articlesData.filter(a =>
            a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.summary?.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        dispatch(setArticles({
          articles: articlesData,
          total: res.data.total
        }));

      } catch (err) {
        console.error(err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchArticles();
  }, [selectedCategory, searchQuery, currentPage, dispatch]);

  const totalPages = Math.ceil(total / ARTICLES_PER_PAGE);

  return (
    <div style={{ maxWidth: 1200, margin: '32px auto', padding: '0 16px' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 22, color: '#222' }}>
          {selectedCategory !== 'Tất cả' ? `📂 ${selectedCategory}` : '🗞️ Tin mới nhất'}
          {searchQuery && (
            <span style={{ fontSize: 16, color: '#888', marginLeft: 12 }}>
              — Kết quả cho "{searchQuery}"
            </span>
          )}
        </h2>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#888', padding: 48 }}>Đang tải...</p>
      ) : !articles || articles.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888', padding: 48 }}>Không tìm thấy bài viết nào.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 24,
        }}>
          {articles.map(article => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}

      {/* Phân trang */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => dispatch(setCurrentPage(p))}
              style={{
                padding: '6px 14px',
                borderRadius: 4,
                border: '1px solid #ddd',
                background: p === currentPage ? '#c0392b' : '#fff',
                color: p === currentPage ? '#fff' : '#333',
                cursor: 'pointer',
                fontWeight: p === currentPage ? 'bold' : 'normal',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}