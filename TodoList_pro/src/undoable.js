/**
 * undoable(reducer, options)
 * --------------------------------------
 * HOC reducer đơn giản tạo khả năng UNDO/REDO theo mẫu past/present/future.
 * - past: mảng lưu các snapshot trước đó
 * - present: snapshot hiện tại
 * - future: mảng snapshot phía trước (sau khi redo)
 * 
 * Lý do không dùng thư viện: muốn code ngắn gọn, dễ đọc.
 */
export default function undoable(reducer, { limit = 50, include = () => true } = {}) {
  const initial = reducer(undefined, { type: "@@INIT" });
  const initialState = { past: [], present: initial, future: [] };

  return function (state = initialState, action) {
    // Xử lý UNDO
    if (action.type === "undo/UNDO") {
      if (state.past.length === 0) return state;
      const past = state.past.slice();
      const prev = past.pop(); // lấy bản trước
      return { past, present: prev, future: [state.present, ...state.future] };
    }
    // Xử lý REDO
    if (action.type === "undo/REDO") {
      if (state.future.length === 0) return state;
      const [next, ...rest] = state.future; // lấy bản sau
      return { past: [...state.past, state.present], present: next, future: rest };
    }

    // Chạy reducer gốc để lấy present mới
    const newPresent = reducer(state.present, action);
    if (newPresent === state.present) return state; // không đổi gì

    // Chỉ ghi lịch sử nếu include(action) cho phép
    if (!include(action)) return { ...state, present: newPresent };

    const newPast = [...state.past, state.present].slice(-limit);
    return { past: newPast, present: newPresent, future: [] };
  };
}

export const undoActions = {
  undo: () => ({ type: "undo/UNDO" }),
  redo: () => ({ type: "undo/REDO" }),
};
