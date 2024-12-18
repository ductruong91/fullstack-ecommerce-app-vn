import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: [],
};


const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
       const { key, value } = action.payload;
      // Kiểm tra nếu filter cùng key đã tồn tại thì thay thế giá trị
      const existingFilterIndex = state.filters.findIndex(
        (filter) => filter.key === key
      );
      if (existingFilterIndex !== -1) {
        state.filters[existingFilterIndex] = { key, value };
      } else {
        state.filters.push({ key, value }); // Nếu không tồn tại thì thêm mới
      }
    },
    removeFilter: (state, action) => {
      const { key } = action.payload;
      state.filters = state.filters.filter((filter) => filter.key !== key); // Xóa filter theo key
    },
    clearFilters: (state) => {
      state.filters = []; // Xóa tất cả filter
    },
  },
});

export const { setFilter, removeFilter, clearFilters } = filterSlice.actions;

export default filterSlice.reducer;