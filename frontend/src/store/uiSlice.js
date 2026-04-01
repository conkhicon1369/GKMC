import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    selectedCategory: 'Tất cả',  // filter danh mục
    searchQuery: '',              // từ khóa tìm kiếm
    loading: false,
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setSelectedCategory, setSearchQuery, setLoading } = uiSlice.actions;
export default uiSlice.reducer;
