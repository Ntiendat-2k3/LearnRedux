// --- Root UI (Level 3) ---
// Kết nối UI với Redux bằng useSelector/useDispatch.
// - Khi mount: dispatch bootstrap() để seed 2 project đặc biệt.
// - Form "thêm việc": gửi addTodo({ title, projectId }) theo project đang chọn.
// - Danh sách: lấy từ selectVisible (đã lọc theo project/status/search).
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import { addTodo, toggleTodo, removeTodo } from "./features/todos/todosSlice";
import { selectVisible, selectSelectedProjectId } from "./features/selectors";
import { projectsActions } from "./features/projects/projectsSlice";

export default function App() {
  const dispatch = useDispatch();

  // Lấy danh sách todo đã qua lọc (project/status/search)
  const todos = useSelector(selectVisible);

  // Lấy project hiện đang chọn để gán cho task khi thêm mới
  const projectId = useSelector(selectSelectedProjectId);

  // State cục bộ cho input "title"
  const [title, setTitle] = useState("");

  // Seed "Inbox/Today" ngay khi app mount
  useEffect(() => {
    dispatch(projectsActions.bootstrap());
  }, [dispatch]);

  // Xử lý submit form thêm task
  function add(e) {
    e.preventDefault();
    if (!title.trim()) return;
    // Gán projectId đang chọn (fallback "inbox" nếu chưa có)
    dispatch(addTodo({ title, projectId: projectId || "inbox" }));
    setTitle("");
  }

  return (
    <div className="container grid grid-2">
      {/* Cột trái: Sidebar hiển thị & chọn Project */}
      <Sidebar />

      {/* Cột phải: Form + danh sách task đã lọc */}
      <div className="card">
        <h1>Todo — Level 3 (Projects)</h1>

        {/* Form thêm task */}
        <form onSubmit={add} className="row">
          <input
            autoFocus
            placeholder="Việc cần làm..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="primary">Thêm</button>
        </form>

        {/* Danh sách task hiển thị */}
        <ul>
          {todos.map((t) => (
            <li key={t.id} className={t.completed ? "done" : ""}>
              <div className="title">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => dispatch(toggleTodo(t.id))}
                />
                <span>{t.title}</span>
              </div>
              <button onClick={() => dispatch(removeTodo(t.id))}>Xoá</button>
            </li>
          ))}
        </ul>

        {/* Trạng thái rỗng */}
        {todos.length === 0 && (
          <div className="empty">Không có task trong project này.</div>
        )}
      </div>
    </div>
  );
}
