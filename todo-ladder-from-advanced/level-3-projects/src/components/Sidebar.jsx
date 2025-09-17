// --- Sidebar Projects (Level 3) ---
// Hiển thị danh sách project, cho phép chọn project, thêm project mới.
// Quy ước: luôn ưu tiên hiển thị "today" & "inbox" lên đầu danh sách.
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProjects,
  selectProjectIds,
  selectSelectedProjectId,
} from "../features/selectors";
import { projectsActions } from "../features/projects/projectsSlice";

export default function Sidebar() {
  const dispatch = useDispatch();

  // Lấy map project, danh sách id & id đang chọn
  const projects = useSelector(selectProjects);
  const ids = useSelector(selectProjectIds);
  const selected = useSelector(selectSelectedProjectId);

  // State cục bộ cho input "tên project mới"
  const [name, setName] = useState("");

  // Submit form để thêm project
  function add(e) {
    e.preventDefault();
    if (!name.trim()) return;

    // Tạo màu ngẫu nhiên cho project mới (chỉ để dễ nhận biết)
    const color = `hsl(${Math.floor(Math.random() * 360)} 70% 45%)`;

    // dispatch action thêm project
    dispatch(projectsActions.addProject({ name: name.trim(), color }));

    // reset input
    setName("");
  }

  return (
    <div className="sidebar">
      <h2>Projects</h2>

      {/* Danh sách project: today + inbox + còn lại */}
      <ul>
        {["today", "inbox", ...ids.filter((id) => !["inbox", "today"].includes(id))].map(
          (id) => {
            const p = projects[id];
            if (!p) return null;

            return (
              <li
                key={id}
                className={"project-item " + (selected === id ? "active" : "")}
                onClick={() => dispatch(projectsActions.selectProject(id))}
                title={p.name}
              >
                <span className="dot" style={{ background: p.color }} />
                <span>{p.name}</span>
              </li>
            );
          }
        )}
      </ul>

      {/* Form thêm project mới */}
      <form onSubmit={add} className="row" style={{ marginTop: 8 }}>
        <input
          placeholder="Tên project mới"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button>Thêm</button>
      </form>
    </div>
  );
}
