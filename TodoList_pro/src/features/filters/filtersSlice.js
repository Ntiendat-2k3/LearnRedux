/**
 * filtersSlice: Quản lý trạng thái bộ lọc + sắp xếp
 * - search: chuỗi tìm kiếm toàn văn (title + description)
 * - status: all | active | completed | overdue | dueToday | dueWeek
 * - priorities: mảng mức ưu tiên được bật
 * - tags: lọc chứa đầy đủ các tag chọn
 * - sortBy/sortDir: tham số sắp xếp
 * - hideCompleted: ẩn task đã hoàn tất
 */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  status: "all",
  priorities: [1, 2, 3],
  tags: [],
  sortBy: "manual", // manual | dueDate | priority | createdAt | title
  sortDir: "asc",
  hideCompleted: false,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    /** Gộp cập nhật hàng loạt để set nhiều trường filter một lúc */
    setAll(state, action) { return { ...state, ...action.payload }; },
    reset() { return initialState; },
  },
});

export const { setAll, reset } = filtersSlice.actions;
export default filtersSlice.reducer;
