/**
 * Tạo Redux store với Redux Toolkit.
 * - Kết hợp 3 slice: todos, projects, filters.
 * - Bọc reducer gốc bằng HOC undoable để có undo/redo (giới hạn 100 bước).
 * - Lưu/persist state hiện tại vào localStorage (không lưu past/future).
 */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todosReducer, { todosActions } from "./features/todos/todosSlice";
import projectsReducer, { projectsActions } from "./features/projects/projectsSlice";
import filtersReducer from "./features/filters/filtersSlice";
import undoable, { undoActions } from "./undoable";

const PERSIST_KEY = "redux_todo_advanced_v1";

/** Đọc state từ localStorage khi khởi tạo (nếu có) */
function loadState() {
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch (_) {
    return undefined;
  }
}

/** Ghi/persist state vào localStorage sau mỗi lần dispatch */
function saveState(state) {
  try {
    localStorage.setItem(PERSIST_KEY, JSON.stringify(state));
  } catch (_) {}
}

const baseReducer = combineReducers({
  todos: todosReducer,
  projects: projectsReducer,
  filters: filtersReducer,
});

/**
 * Bọc reducer bằng undoable để thêm khả năng undo/redo.
 * include(): chỉ ghi lại lịch sử cho những action làm thay đổi dữ liệu chính.
 */
const rootReducer = undoable(baseReducer, {
  limit: 100,
  include: (action) => {
    const type = action.type;
    return [
      "todos/addTodo","todos/updateTodo","todos/toggleTodo","todos/removeTodo",
      "todos/clearCompleted","todos/reorderInProject","todos/bulkToggle",
      "todos/addSubtask","todos/toggleSubtask","todos/removeSubtask",
      "todos/assignTags","todos/setDueDate","todos/changePriority",
      "projects/addProject","projects/updateProject","projects/removeProject",
      "filters/setAll",
    ].includes(type);
  }
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
});

// Persist chỉ phần present (undoable lưu {past,present,future})
store.subscribe(() => {
  const state = store.getState();
  const present = state.present ?? state;
  saveState(present);
});

// Gom một số action xuất ra để dùng ngoài App
export const AppActions = { ...todosActions, ...projectsActions, ...undoActions };
