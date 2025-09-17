// --- Bộ lọc đơn giản (Level 2/3) ---
// Mục tiêu: gom các trạng thái lọc/sort/tìm kiếm vào 1 slice Redux.
// - status: all | active | completed
// - search: chuỗi để tìm theo tiêu đề
// - sortBy/sortDir: tham số sắp xếp đơn giản
import {createSlice} from "@reduxjs/toolkit";

/** Level 2: Bộ lọc + sắp xếp đơn giản */
const filtersSlice = createSlice({ // tên slice -> xuất hiện trong type của action (ví dụ: "filters/setFilters")
    name: "filters",

    // state khởi tạo cho phần filters trong Redux store
    initialState: {
        status: "all",
        search: "",
        sortBy: "createdAt",
        sortDir: "desc"
    },

    // reducers là các hàm cập nhật state (immutable thân thiện nhờ Immer)
    reducers: {
        // setFilters: cập nhật hàng loạt trường filter bằng cách merge payload vào state
        // Lưu ý: trả về object mới (thay vì mutate) để minh hoạ cả 2 phong cách đều OK
        setFilters(state, action) {
            return {
                ...state,
                ...action.payload
            };
        }
    }
});

// Action creators sinh tự động theo tên reducers
export const {setFilters} = filtersSlice.actions;

// Reducer mặc định của slice -> combine vào store
export default filtersSlice.reducer;
