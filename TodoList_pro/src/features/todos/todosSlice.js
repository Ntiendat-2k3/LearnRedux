/**
 * todosSlice: Quản lý todos theo dạng state chuẩn hoá
 * - entities: { id -> todo }
 * - ids: thứ tự hiển thị (mặc định đảo ngược thời gian tạo: mới lên đầu)
 * 
 * Mỗi todo có:
 * id, title, description, completed, projectId, priority(1-3), dueDate, tags[], order, createdAt, updatedAt, subtasks[]
 */
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  entities: {},
  ids: [],
};

/** Tạo subtask rỗng tiện dụng */
const emptySubtask = (title = "") => ({ id: nanoid(), title, done: false });

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    /** Thêm task mới */
    addTodo: {
      reducer(state, action) {
        const t = action.payload;
        state.entities[t.id] = t;
        state.ids.unshift(t.id); // mới nhất lên đầu
      },
      prepare({ title, description = "", projectId = "inbox", priority = 2, dueDate = null, tags = [], subtasks = [] }) {
        const id = nanoid();
        return {
          payload: {
            id,
            title: title.trim(),
            description,
            completed: false,
            projectId,
            priority,          // 1=Low 2=Med 3=High
            dueDate,           // timestamp hoặc null
            tags,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            order: Date.now(), // dùng làm key sắp xếp thủ công
            subtasks: subtasks.map(s => emptySubtask(s)),
          },
        };
      },
    },
    /** Cập nhật một số trường của task */
    updateTodo(state, action) {
      const { id, changes } = action.payload;
      const t = state.entities[id];
      if (!t) return;
      Object.assign(t, changes);
      t.updatedAt = Date.now();
    },
    /** Toggle hoàn tất */
    toggleTodo(state, action) {
      const id = action.payload;
      const t = state.entities[id];
      if (t) { t.completed = !t.completed; t.updatedAt = Date.now(); }
    },
    /** Xoá task */
    removeTodo(state, action) {
      const id = action.payload;
      delete state.entities[id];
      state.ids = state.ids.filter(x => x !== id);
    },
    /** Xoá tất cả task đã hoàn tất (có thể theo project) */
    clearCompleted(state, action) {
      const { projectId } = action.payload || {};
      const toRemove = state.ids.filter(id => {
        const t = state.entities[id];
        return t && t.completed && (!projectId || t.projectId === projectId);
      });
      toRemove.forEach(id => delete state.entities[id]);
      state.ids = state.ids.filter(id => !toRemove.includes(id));
    },
    /** Đánh dấu hàng loạt theo danh sách ids */
    bulkToggle(state, action) {
      const { ids, completed } = action.payload;
      ids.forEach(id => { const t = state.entities[id]; if (t) { t.completed = completed; t.updatedAt = Date.now(); } });
    },
    /**
     * Kéo‑thả để đổi thứ tự trong cùng 1 project.
     * - Tạo danh sách id theo project & thứ tự hiện tại
     * - Di chuyển source -> target
     * - Ghi lại order = index mới
     */
    reorderInProject(state, action) {
      const { projectId, sourceId, targetId } = action.payload;
      const list = state.ids
        .map(id => state.entities[id])
        .filter(t => t && t.projectId === projectId)
        .sort((a,b) => a.order - b.order)
        .map(t => t.id);
      const from = list.indexOf(sourceId);
      const to = list.indexOf(targetId);
      if (from === -1 || to === -1 || from === to) return;
      list.splice(to, 0, list.splice(from, 1)[0]);
      list.forEach((id, idx) => { state.entities[id].order = idx; });
    },
    // ===== Subtasks =====
    addSubtask(state, action) {
      const { todoId, title } = action.payload;
      const t = state.entities[todoId];
      if (t) { t.subtasks.push({ id: nanoid(), title, done: false }); t.updatedAt = Date.now(); }
    },
    toggleSubtask(state, action) {
      const { todoId, subtaskId } = action.payload;
      const t = state.entities[todoId];
      if (!t) return;
      const s = t.subtasks.find(x => x.id === subtaskId);
      if (s) { s.done = !s.done; t.updatedAt = Date.now(); }
    },
    removeSubtask(state, action) {
      const { todoId, subtaskId } = action.payload;
      const t = state.entities[todoId];
      if (!t) return;
      t.subtasks = t.subtasks.filter(s => s.id !== subtaskId);
      t.updatedAt = Date.now();
    },
    // ===== Tags / Due / Priority =====
    assignTags(state, action) {
      const { id, tags } = action.payload;
      const t = state.entities[id];
      if (t) { t.tags = Array.from(new Set(tags.map(x => x.trim()).filter(Boolean))); t.updatedAt = Date.now(); }
    },
    setDueDate(state, action) {
      const { id, dueDate } = action.payload;
      const t = state.entities[id];
      if (t) { t.dueDate = dueDate; t.updatedAt = Date.now(); }
    },
    changePriority(state, action) {
      const { id, priority } = action.payload;
      const t = state.entities[id];
      if (t) { t.priority = priority; t.updatedAt = Date.now(); }
    },
  },
});

export const todosActions = todosSlice.actions;
export default todosSlice.reducer;
