import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CATEGORIES = ['Thời sự', 'Kinh tế', 'Thể thao', 'Giải trí', 'Công nghệ'];

export default function CreateArticlePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    summary: '',
    content: '',
    thumbnail: '',
    category: 'Thời sự',
    tags: '',
    authorId: 1,
    status: 'published',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      setError('Vui lòng nhập tiêu đề và nội dung.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        authorId: Number(form.authorId),
      };
      const res = await axios.post('/api/articles', payload);
      navigate(`/article/${res.data.slug}`);
    } catch (err) {
      setError('Đăng bài thất bại. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 6,
    border: '1px solid #ddd', fontSize: 15, boxSizing: 'border-box', marginBottom: 16,
  };

  const labelStyle = { display: 'block', marginBottom: 4, fontWeight: 600, color: '#444', fontSize: 14 };

  return (
    <div style={{ maxWidth: 780, margin: '40px auto', padding: '0 16px' }}>
      <h2 style={{ fontSize: 26, color: '#c0392b', marginBottom: 28 }}>✍️ Đăng bài viết mới</h2>

      {error && (
        <div style={{ background: '#fde8e8', border: '1px solid #e74c3c', color: '#c0392b', padding: '12px 16px', borderRadius: 6, marginBottom: 20 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Tiêu đề *</label>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Nhập tiêu đề bài viết" style={inputStyle} required />

        <label style={labelStyle}>Tóm tắt</label>
        <textarea name="summary" value={form.summary} onChange={handleChange} placeholder="Mô tả ngắn về bài viết" rows={2} style={{ ...inputStyle, resize: 'vertical' }} />

        <label style={labelStyle}>Nội dung *</label>
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Nội dung chi tiết..." rows={12} style={{ ...inputStyle, resize: 'vertical' }} required />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label style={labelStyle}>Danh mục</label>
            <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Trạng thái</label>
            <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
              <option value="published">Đã xuất bản</option>
              <option value="draft">Bản nháp</option>
            </select>
          </div>
        </div>

        <label style={labelStyle}>Ảnh thumbnail (URL)</label>
        <input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="https://..." style={inputStyle} />

        <label style={labelStyle}>Tags (phân cách bằng dấu phẩy)</label>
        <input name="tags" value={form.tags} onChange={handleChange} placeholder="ví dụ: kinh tế, tài chính, ngân hàng" style={inputStyle} />

        <label style={labelStyle}>ID Tác giả</label>
        <input name="authorId" type="number" value={form.authorId} onChange={handleChange} style={{ ...inputStyle, width: 120 }} />

        {/* Preview thumbnail */}
        {form.thumbnail && (
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 13, color: '#888', marginBottom: 6 }}>Preview ảnh:</p>
            <img src={form.thumbnail} alt="preview" style={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 6 }} />
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button
            type="submit"
            disabled={loading}
            style={{ background: '#c0392b', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: 6, cursor: 'pointer', fontWeight: 'bold', fontSize: 15 }}
          >
            {loading ? 'Đang đăng...' : '📤 Đăng bài'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{ background: '#f0f0f0', color: '#555', border: 'none', padding: '12px 24px', borderRadius: 6, cursor: 'pointer', fontSize: 15 }}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
