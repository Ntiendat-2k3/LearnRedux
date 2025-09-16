/**
 * Selectors (đã fix cho undoable):
 * LƯU Ý: vì reducer gốc được bọc bởi undoable => state thực nằm trong state.present
 * => Luôn dùng S(s) = s.present ?? s để lấy "present state".
 */
import { createSelector } from "@reduxjs/toolkit";
import {
  isSameDay,
  isWithinInterval,
  startOfToday,
  endOfWeek,
  startOfWeek,
} from "date-fns";

/** Lấy ra cây state hiện hành (nếu có undoable thì là state.present) */
const S = (s) => (s && s.present) ? s.present : (s || {});

/** Fallback an toàn để tránh crash khi state chưa kịp khởi tạo */
const defaultProjects = { entities: {}, ids: [], selectedId: null };
const defaultTodos = { entities: {}, ids: [] };
const defaultFilters = {
  search: "",
  status: "all",         // all | active | completed | overdue | dueToday | dueWeek
  priorities: [1, 2, 3],
  tags: [],
  sortBy: "manual",      // manual | dueDate | priority | createdAt | title
  sortDir: "asc",
  hideCompleted: false,
};

/* =================== Base selectors (đã qua S) =================== */
const _projects = (s) => S(s).projects || defaultProjects;
const _todos = (s) => S(s).todos || defaultTodos;
const _filters = (s) => S(s).filters || defaultFilters;

/* =================== Public selectors =================== */
// Projects
export const selectProjects = (s) => _projects(s).entities;
export const selectProjectIds = (s) => _projects(s).ids;
export const selectSelectedProjectId = (s) => _projects(s).selectedId;

// Todos
export const selectTodosMap = (s) => _todos(s).entities;
export const selectTodoIds = (s) => _todos(s).ids;

// Filters
export const selectFilters = (s) => _filters(s);

/** Lấy toàn bộ tag để hiển thị gợi ý */
export const selectAllTags = createSelector([selectTodosMap], (map) => {
  const set = new Set();
  Object.values(map).forEach((t) => t?.tags?.forEach((tag) => set.add(tag)));
  return Array.from(set).sort();
});

/**
 * Tính toán danh sách ID todo hiển thị dựa trên:
 * - Project đang chọn (Inbox/Today/khác)
 * - Search, Status, Priorities, Tags, Hide completed
 * - Sort (manual/dueDate/priority/createdAt/title + asc/desc)
 */
export const selectVisibleTodoIds = createSelector(
  [selectTodosMap, selectTodoIds, selectSelectedProjectId, selectFilters],
  (map, ids, pid, f) => {
    const today = new Date();
    const startWeek = startOfWeek(today, { weekStartsOn: 1 });
    const endWeek = endOfWeek(today, { weekStartsOn: 1 });

    let list = ids.map((id) => map[id]).filter(Boolean);

    // Lọc theo project (đặc biệt: Today)
    if (pid && pid !== "today") list = list.filter((t) => t.projectId === pid);
    if (pid === "today")
      list = list.filter(
        (t) =>
          (t.dueDate && isSameDay(new Date(t.dueDate), today)) ||
          isSameDay(new Date(t.createdAt), today)
      );

    // Search toàn văn đơn giản
    const q = f.search.trim().toLowerCase();
    if (q) list = list.filter((t) => (t.title + " " + t.description).toLowerCase().includes(q));

    // Trạng thái
    if (f.status === "active") list = list.filter((t) => !t.completed);
    if (f.status === "completed") list = list.filter((t) => t.completed);
    if (f.status === "overdue") list = list.filter((t) => !t.completed && t.dueDate && new Date(t.dueDate) < startOfToday());
    if (f.status === "dueToday") list = list.filter((t) => t.dueDate && isSameDay(new Date(t.dueDate), today));
    if (f.status === "dueWeek")
      list = list.filter(
        (t) =>
          t.dueDate &&
          isWithinInterval(new Date(t.dueDate), { start: startWeek, end: endWeek })
      );

    // Ưu tiên
    list = list.filter((t) => f.priorities.includes(t.priority));

    // Tags (AND logic – phải chứa hết các tag chọn)
    if (f.tags?.length) list = list.filter((t) => f.tags.every((tag) => t.tags.includes(tag)));

    // Ẩn task hoàn tất
    if (f.hideCompleted) list = list.filter((t) => !t.completed);

    // Sort
    const dir = f.sortDir === "asc" ? 1 : -1;
    const cmp = {
      manual: (a, b) => (a.order - (b.order)) * dir,
      dueDate: (a, b) => ((a.dueDate ?? Infinity) - (b.dueDate ?? Infinity)) * dir,
      priority: (a, b) => (a.priority - b.priority) * dir,
      createdAt: (a, b) => (a.createdAt - b.createdAt) * dir,
      title: (a, b) => a.title.localeCompare(b.title) * dir,
    }[f.sortBy] ?? (() => 0);

    list.sort(cmp);
    return list.map((t) => t.id);
  }
);

/** Thống kê cơ bản */
export const selectCounts = createSelector([selectTodosMap, selectTodoIds], (map, ids) => {
  const total = ids.length;
  let completed = 0;
  let overdue = 0;
  const now = new Date();
  ids.forEach((id) => {
    const t = map[id];
    if (!t) return;
    if (t.completed) completed++;
    if (!t.completed && t.dueDate && new Date(t.dueDate) < now) overdue++;
  });
  return { total, completed, overdue, active: total - completed };
});
