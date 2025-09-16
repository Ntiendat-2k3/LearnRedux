/**
 * TodoList: render danh sách task theo các id đã được bộ lọc/selector tính toán.
 * - Hỗ trợ kéo‑thả từng item để reorder trong cùng project.
 * - Có nút mở TodoEditor để thêm task mới.
 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectVisibleTodoIds, selectTodosMap, selectSelectedProjectId } from "../features/selectors";
import TodoItem from "./TodoItem";
import TodoEditor from "./TodoEditor";

export default function TodoList(){
  const dispatch = useDispatch();
  const ids = useSelector(selectVisibleTodoIds);
  const map = useSelector(selectTodosMap);
  const projectId = useSelector(selectSelectedProjectId);
  const [editorOpen, setEditorOpen] = useState(false);

  function onDragStart(e, id){ e.dataTransfer.setData("text/todo", id); }
  function onDragOver(e){ e.preventDefault(); }
  function onDrop(e, targetId){
    const sourceId = e.dataTransfer.getData("text/todo");
    if (!sourceId || sourceId === targetId) return;
    dispatch({ type:"todos/reorderInProject", payload:{ projectId, sourceId, targetId } });
  }

  return (
    <div>
      <div className="list-header">
        <button className="primary" onClick={()=>setEditorOpen(true)}>+ Thêm task</button>
      </div>
      <ul className="todo-list">
        {ids.map(id => (
          <li key={id} draggable onDragStart={e=>onDragStart(e,id)} onDragOver={onDragOver} onDrop={e=>onDrop(e,id)}>
            <TodoItem todo={map[id]} />
          </li>
        ))}
        {ids.length === 0 && <div className="empty">Không có task nào phù hợp bộ lọc.</div>}
      </ul>
      {editorOpen && <TodoEditor onClose={()=>setEditorOpen(false)} />}
    </div>
  );
}
