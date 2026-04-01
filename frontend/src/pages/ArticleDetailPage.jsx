import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setSelectedArticle, setComments, addComment } from '../store/articleSlice';

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { selectedArticle, comments } = useSelector(s => s.article);

  const [username, setUsername] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`/api/articles/${slug}`);
        dispatch(setSelectedArticle(res.data));

        const commentsRes = await axios.get(`/api/comments/${res.data._id}`);
        dispatch(setComments(commentsRes.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchArticle();
  }, [slug, dispatch]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!username.trim() || !commentContent.trim()) return;
    setSubmitting(true);
    try {
      const res = await axios.post('/api/comments', {
        articleId: selectedArticle._id,
        username,
        content: commentContent,
      });
      dispatch(addComment(res.data));
      setCommentContent('');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!selectedArticle) return <p style={{ textAlign: 'center', padding: 60 }}>Đang tải...</p>;

  const date = new Date(selectedArticle.publishedAt).toLocaleDateString('vi-VN', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div style={{ maxWidth: 860, margin: '32px auto', padding: '0 16px' }}>
      {/* Breadcrumb */}
      <p style={{ color: '#888', fontSize: 13 }}>
        <Link to="/" style={{ color: '#c0392b' }}>Trang chủ</Link> &rsaquo;{' '}
        <Link to={`/category/${selectedArticle.category}`} style={{ color: '#c0392b' }}>
          {selectedArticle.category}
        </Link> &rsaquo; {selectedArticle.title}
      </p>

      {/* Tiêu đề */}
      <h1 style={{ fontSize: 30, lineHeight: 1.3, margin: '12px 0', color: '#111' }}>
        {selectedArticle.title}
      </h1>

      {/* Meta */}
      <div style={{ display: 'flex', gap: 20, color: '#777', fontSize: 13, marginBottom: 20, flexWrap: 'wrap' }}>
        <span>📅 {date}</span>
        <span>👁 {selectedArticle.views} lượt xem</span>
        <span style={{ background: '#c0392b', color: '#fff', padding: '2px 10px', borderRadius: 4 }}>
          {selectedArticle.category}
        </span>
      </div>

      {/* Tóm tắt */}
      {selectedArticle.summary && (
        <p style={{
          borderLeft: '4px solid #c0392b', paddingLeft: 16,
          color: '#555', fontStyle: 'italic', fontSize: 16, margin: '0 0 20px',
        }}>
          {selectedArticle.summary}
        </p>
      )}

      {/* Thumbnail */}
      {selectedArticle.thumbnail && (
        <img
          src={selectedArticle.thumbnail}
          alt={selectedArticle.title}
          style={{ width: '100%', borderRadius: 8, marginBottom: 24, maxHeight: 460, objectFit: 'cover' }}
        />
      )}

      {/* Nội dung */}
      <div style={{ fontSize: 17, lineHeight: 1.9, color: '#222', marginBottom: 40, whiteSpace: 'pre-line' }}>
        {selectedArticle.content}
      </div>

      {/* Tags */}
      {selectedArticle.tags?.length > 0 && (
        <div style={{ marginBottom: 40 }}>
          <strong>Tags: </strong>
          {selectedArticle.tags.map(tag => (
            <span key={tag} style={{
              background: '#f0f0f0', borderRadius: 4, padding: '3px 10px',
              marginRight: 8, fontSize: 13, color: '#555',
            }}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      <hr style={{ borderColor: '#eee', marginBottom: 32 }} />

      {/* Bình luận */}
      <section>
        <h3 style={{ fontSize: 20, marginBottom: 20 }}>💬 Bình luận ({comments.length})</h3>

        {/* Form bình luận */}
        <form onSubmit={handleComment} style={{ marginBottom: 32, background: '#fafafa', padding: 20, borderRadius: 8 }}>
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Tên của bạn"
            required
            style={{ width: '100%', padding: '10px 14px', borderRadius: 6, border: '1px solid #ddd', marginBottom: 12, boxSizing: 'border-box', fontSize: 14 }}
          />
          <textarea
            value={commentContent}
            onChange={e => setCommentContent(e.target.value)}
            placeholder="Viết bình luận của bạn..."
            required
            rows={4}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 6, border: '1px solid #ddd', marginBottom: 12, boxSizing: 'border-box', fontSize: 14, resize: 'vertical' }}
          />
          <button
            type="submit"
            disabled={submitting}
            style={{ background: '#c0392b', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 6, cursor: 'pointer', fontWeight: 'bold', fontSize: 14 }}
          >
            {submitting ? 'Đang gửi...' : 'Gửi bình luận'}
          </button>
        </form>

        {/* Danh sách bình luận */}
        {comments.length === 0 ? (
          <p style={{ color: '#999', textAlign: 'center' }}>Chưa có bình luận nào. Hãy là người đầu tiên!</p>
        ) : (
          comments.map(c => (
            <div key={c._id} style={{
              borderBottom: '1px solid #eee', paddingBottom: 16, marginBottom: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', background: '#c0392b',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 'bold', fontSize: 16,
                }}>
                  {c.username[0].toUpperCase()}
                </div>
                <div>
                  <strong style={{ fontSize: 14 }}>{c.username}</strong>
                  <div style={{ fontSize: 12, color: '#aaa' }}>
                    {new Date(c.createdAt).toLocaleDateString('vi-VN')}
                  </div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 15, color: '#333', paddingLeft: 46 }}>{c.content}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
