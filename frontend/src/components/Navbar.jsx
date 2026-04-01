import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchQuery, setSelectedCategory } from '../store/uiSlice';
import { useState } from 'react';

const CATEGORIES = ['Tất cả', 'Thời sự', 'Kinh tế', 'Thể thao', 'Giải trí', 'Công nghệ'];

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(input));
    navigate('/');
  };

  return (
    <nav style={{ background: '#c0392b', padding: '12px 24px', color: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, margin: '0 auto' }}>
        <Link to="/" style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', textDecoration: 'none' }}>
          📰 VietNews
        </Link>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Tìm kiếm bài viết..."
            style={{ padding: '6px 12px', borderRadius: 4, border: 'none', width: 240 }}
          />
          <button type="submit" style={{ padding: '6px 16px', borderRadius: 4, background: '#fff', color: '#c0392b', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
            Tìm
          </button>
        </form>
        <Link to="/create" style={{ color: '#fff', textDecoration: 'none', background: '#e74c3c', padding: '8px 16px', borderRadius: 4 }}>
          + Đăng bài
        </Link>
      </div>
      {/* Thanh danh mục */}
      <div style={{ display: 'flex', gap: 16, maxWidth: 1200, margin: '8px auto 0', flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <Link
            key={cat}
            to={cat === 'Tất cả' ? '/' : `/category/${cat}`}
            onClick={() => dispatch(setSelectedCategory(cat))}
            style={{ color: '#ffdddd', textDecoration: 'none', fontWeight: 500, fontSize: 14 }}
          >
            {cat}
          </Link>
        ))}
      </div>
    </nav>
  );
}
