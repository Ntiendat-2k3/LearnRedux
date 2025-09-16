/**
 * projectsSlice: Quản lý danh sách Project (dự án) dạng state chuẩn hoá
 * - entities: {id -> project}
 * - ids: thứ tự hiển thị
 * - selectedId: project đang chọn (để lọc task)
 * 
 * Có sẵn 2 project đặc biệt:
 * - "inbox": mặc định, chứa mọi task chưa gán project
 * - "today": hiển thị task due trong hôm nay hoặc tạo hôm nay
 */
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  entities: {},
  ids: [],
  selectedId: null,
};

function addProjectBase(state, project) {
  state.entities[project.id] = project;
  state.ids.push(project.id);
  if (!state.selectedId) state.selectedId = project.id;
}

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    /**
     * Tạo 2 project mặc định nếu state đang rỗng.
     * Gọi 1 lần trong App khi mount.
     */
    bootstrap: {
      reducer(state, action) {
        if (state.ids.length > 0) return;
        action.payload.forEach(p => addProjectBase(state, p));
      },
      prepare() {
        return {
          payload: [
            { id: "inbox", name: "Inbox", color: "#6366f1", createdAt: Date.now() },
            { id: "today", name: "Today", color: "#10b981", createdAt: Date.now() },
          ],
        };
      },
    },
    /** Thêm project mới do người dùng nhập */
    addProject: {
      reducer(state, action) {
        addProjectBase(state, action.payload);
      },
      prepare({ name, color }) {
        return { payload: { id: nanoid(), name, color, createdAt: Date.now() } };
      },
    },
    /** Cập nhật tên/màu project */
    updateProject(state, action) {
      const { id, changes } = action.payload;
      if (state.entities[id]) Object.assign(state.entities[id], changes, { updatedAt: Date.now() });
    },
    /** Xoá project (đơn giản) */
    removeProject(state, action) {
      const id = action.payload;
      delete state.entities[id];
      state.ids = state.ids.filter(x => x !== id);
      if (state.selectedId === id) state.selectedId = state.ids[0] ?? null;
    },
    /** Chọn project để xem */
    selectProject(state, action) {
      state.selectedId = action.payload;
    },
  },
});

export const projectsActions = projectsSlice.actions;
export default projectsSlice.reducer;
