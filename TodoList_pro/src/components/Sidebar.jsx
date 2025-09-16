/**
 * Sidebar: hiển thị danh sách Project và form thêm project mới.
 * - 2 project đặc biệt được ưu tiên lên đầu: Today, Inbox.
 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FolderPlus, Calendar, Inbox } from "lucide-react";
import { projectsActions } from "../features/projects/projectsSlice";
import { selectProjectIds, selectProjects, selectSelectedProjectId } from "../features/selectors";

export default function Sidebar() {
  const dispatch = useDispatch();
  const projectIds = useSelector(selectProjectIds);
  const projects = useSelector(selectProjects);
  const selected = useSelector(selectSelectedProjectId);
  const [name, setName] = useState("");

  function addProject(e){
    e.preventDefault();
    if (!name.trim()) return;
    const color = `hsl(${Math.floor(Math.random()*360)} 70% 45%)`; // random màu dễ nhìn
    dispatch(projectsActions.addProject({ name: name.trim(), color }));
    setName("");
  }

  return (
    <div>
      <h2 className="side-title">Projects</h2>
      <ul className="project-list">
        {["today","inbox", ...projectIds.filter(id => !["inbox","today"].includes(id))].map(id => {
          const p = projects[id]; if (!p) return null;
          const Icon = id === "inbox" ? Inbox : id === "today" ? Calendar : FolderPlus;
          return (
            <li key={id} className={"project-item " + (selected===id?"active":"")}
                onClick={() => dispatch(projectsActions.selectProject(id))}>
              <span className="dot" style={{ background:p.color }} />
              <Icon size={16} />
              <span>{p.name}</span>
            </li>
          );
        })}
      </ul>

      <form onSubmit={addProject} className="add-project">
        <input placeholder="Tên project mới" value={name} onChange={e=>setName(e.target.value)} />
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}
