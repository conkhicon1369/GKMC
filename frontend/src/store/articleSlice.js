import { createSlice } from '@reduxjs/toolkit';

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    articles: [],          // danh sách bài viết
    selectedArticle: null, // bài viết đang xem
    total: 0,
    currentPage: 1,
    comments: [],          // bình luận của bài viết hiện tại
  },
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload.articles;
      state.total = action.payload.total;
    },
    setSelectedArticle: (state, action) => {
      state.selectedArticle = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      state.comments.unshift(action.payload);
    },
    removeComment: (state, action) => {
      state.comments = state.comments.filter(c => c._id !== action.payload);
    },
  },
});

export const {
  setArticles,
  setSelectedArticle,
  setCurrentPage,
  setComments,
  addComment,
  removeComment,
} = articleSlice.actions;

export default articleSlice.reducer;
