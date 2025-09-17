// --- Quản lý Todos (Level 3) ---
// Ở level này, để đơn giản, ta dùng mảng items thay vì chuẩn hoá entities/ids.
// Mỗi todo có: { id, title, completed, projectId, createdAt }
import {createSlice, nanoid} from "@reduxjs/toolkit";

/** Thêm projectId để gán task vào project */
const todosSlice = createSlice({
    name: "todos",

    initialState: {
        items: [], // mảng todos
    },

    reducers: { // Thêm todo mới
        addTodo: { // reducer: thêm todo vào đầu mảng (unshift để "mới nhất" nằm trên)
            reducer(state, action) {
                state.items.unshift(action.payload);
            },
            // prepare: nhận { title, projectId? } từ UI, sinh payload hoàn chỉnh
            prepare(
                {
                    title,
                    projectId = "inbox"
                }
            ) {
                return {
                    payload: {
                        id: nanoid(),
                        title: title.trim(),
                        completed: false,
                        projectId, // gán project cho task
                        createdAt: Date.now(), // hỗ trợ sort theo thời điểm tạo
                    }
                };
            }
        },

        // Toggle hoàn tất theo id
        toggleTodo(state, action) {
            const t = state.items.find((x) => x.id === action.payload);
            if (t) 
                t.completed = ! t.completed;
            
        },

        // Xoá todo theo id
        removeTodo(state, action) {
            state.items = state.items.filter((x) => x.id !== action.payload);
        }
    }
});

export const {addTodo, toggleTodo, removeTodo} = todosSlice.actions;
export default todosSlice.reducer;
