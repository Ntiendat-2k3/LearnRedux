// --- Quản lý Projects (Level 3) ---
// Dùng state chuẩn hoá: entities (map id->project), ids (thứ tự hiển thị), selectedId (đang chọn).
// Có 2 project đặc biệt seed sẵn: "inbox" & "today".
import {createSlice, nanoid} from "@reduxjs/toolkit";

/** Level 3: Projects + chọn project */
const projectsSlice = createSlice({
    name: "projects",

    initialState: {
        entities: {}, // { [id]: { id, name, color } }
        ids: [], // [id1, id2, ...] phục vụ render theo thứ tự
        selectedId: null, // id project đang được chọn trong Sidebar
    },

    reducers: {
        // Khởi tạo dữ liệu mặc định (chạy 1 lần khi app mount)
        // Tách "prepare" để tạo payload (mảng projects mặc định).
        bootstrap: { // reducer: nhận state + action.payload (danh sách project seed)
            reducer(state, action) { // Nếu đã có data -> bỏ qua, tránh seed lại khi hot reload
                if (state.ids.length) 
                    return;
                

                // Thêm từng project vào entities + ids
                action.payload.forEach((p) => {
                    state.entities[p.id] = p;
                    state.ids.push(p.id);

                    // Nếu chưa chọn project nào, chọn project đầu tiên (inbox)
                    if (!state.selectedId) 
                        state.selectedId = p.id;
                    
                });
            },
            // prepare: tạo payload trước khi vào reducer (viết tách để giữ reducer thuần)
            prepare() {
                return {
                    payload: [
                        {
                            id: "inbox",
                            name: "Inbox",
                            color: "#6366f1"
                        }, {
                            id: "today",
                            name: "Today",
                            color: "#10b981"
                        },
                    ]
                };
            }
        },

        // Thêm project mới do người dùng nhập
        addProject: {
            reducer(state, action) {
                const p = action.payload;
                state.entities[p.id] = p;
                state.ids.push(p.id);
            },
            // sinh id ngẫu nhiên bằng nanoid, nhận { name, color } từ UI
            prepare(
                {name, color}
            ) {
                return {
                    payload: {
                        id: nanoid(),
                        name,
                        color
                    }
                };
            }
        },

        // Đổi project đang chọn (để lọc tasks theo project)
        selectProject(state, action) {
            state.selectedId = action.payload; // id project
        }
    }
});

export const projectsActions = projectsSlice.actions;
export default projectsSlice.reducer;
