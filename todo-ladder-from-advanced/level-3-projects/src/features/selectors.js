// --- Selectors (Level 3) ---
// Mục tiêu: tách logic lọc hiển thị ra khỏi UI, tận dụng memo hoá của createSelector.
// Giải thích từng selector:
// - selectTodos: lấy mảng todos gốc
// - selectFilters: lấy object filters (status/search/sort...)
// - selectProjects/Ids/SelectedId: phục vụ Sidebar + lọc theo project
// - selectVisible: KẾT QUẢ cuối cùng (todos đã áp dụng project + status + search)
import {createSelector} from "@reduxjs/toolkit";

// Base selectors: lấy trực tiếp từ state
export const selectTodos = (s) => s.todos.items;
export const selectFilters = (s) => s.filters;
export const selectProjects = (s) => s.projects.entities;
export const selectProjectIds = (s) => s.projects.ids;
export const selectSelectedProjectId = (s) => s.projects.selectedId;

// Selector dẫn xuất: lọc theo project + status + search
export const selectVisible = createSelector(
    // 1) Input selectors —> truyền KẾT QUẢ của chúng cho resultFn theo thứ tự
        [
        selectTodos, selectFilters, selectSelectedProjectId
    ],

    // 2) resultFn: (items, f, pid) là 3 kết quả ở trên
        (items, f, pid) => { // Sao chép mảng để không mutate mảng gốc khi sort/filter
        let list = [...items];

        // --- Lọc theo PROJECT ---
        // pid = "today" (đặc biệt): hiển thị task tạo trong NGÀY HÔM NAY
        // pid khác "today": lọc tasks có projectId trùng pid
        if (pid && pid !== "today") {
            list = list.filter((t) => (t.projectId || "inbox") === pid);
        }
        if (pid === "today") {
            const today = new Date();
            list = list.filter((t) => {
                const d = new Date(t.createdAt || Date.now());
                return d.toDateString() === today.toDateString();
            });
        }

        // --- Lọc theo STATUS ---
        if (f.status === "active") 
            list = list.filter((t) => !t.completed);
        
        if (f.status === "completed") 
            list = list.filter((t) => t.completed);
        

        // --- Tìm kiếm theo tiêu đề ---
        if (f.search ?. trim()) {
            const q = f.search.toLowerCase();
            list = list.filter((t) => t.title.toLowerCase().includes(q));
        }

        // (Level 3 dừng ở đây; phần sort nâng cao sẽ xuất hiện ở level tiếp theo)
        return list;
    }
);
