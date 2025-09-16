/**
 * ProjectEditor: ví dụ nhỏ chỉnh sửa tên/màu project (chỉ hiện với project thường)
 * *Inbox* và *Today* không cho chỉnh.
 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectsActions } from "../features/projects/projectsSlice";
import { selectProjects, selectSelectedProjectId } from "../features/selectors";

export default function ProjectEditor(){
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const selected = useSelector(selectSelectedProjectId);
  const p = projects[selected];
  const [name, setName] = useState(p?.name ?? "");
  const [color, setColor] = useState(p?.color ?? "#6366f1");

  if (!p || ["inbox","today"].includes(p.id)) return null;

  function save(){ dispatch(projectsActions.updateProject({ id:p.id, changes:{ name, color } })); }
  function remove(){
    if (confirm("Xoá project này? (Tasks còn lại tạm thời không tự chuyển)")) {
      dispatch(projectsActions.removeProject(p.id));
    }
  }

  return (
    <div className="proj-editor">
      <input value={name} onChange={e=>setName(e.target.value)} />
      <input type="color" value={color} onChange={e=>setColor(e.target.value)} />
      <button onClick={save}>Lưu</button>
      <button onClick={remove}>Xoá</button>
    </div>
  );
}
