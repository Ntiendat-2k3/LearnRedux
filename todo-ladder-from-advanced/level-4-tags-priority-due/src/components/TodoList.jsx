import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectVisibleTodoIds, selectTodosMap, selectSelectedProjectId, selectAllTags } from "../features/selectors";
import { addTodo, toggleTodo, removeTodo, updateTodo } from "../features/todos/todosSlice";

export default function TodoList(){
  const dispatch = useDispatch();
  const ids = useSelector(selectVisibleTodoIds);
  const map = useSelector(selectTodosMap);
  const pid = useSelector(selectSelectedProjectId);
  const allTags = useSelector(selectAllTags);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(2);
  const [due, setDue] = useState("");
  const [tagInput, setTagInput] = useState("");

  function add(e){
    e.preventDefault();
    if (!title.trim()) return;
    const tags = tagInput.split(",").map(t=>t.trim()).filter(Boolean);
    dispatch(addTodo({ title, projectId: pid||"inbox", priority:Number(priority), dueDate: due? new Date(due).getTime(): null, tags }));
    setTitle(""); setDue(""); setTagInput("");
  }

  return (
    <div className="card">
      <h2>Tasks</h2>
      <form onSubmit={add} className="row">
        <input placeholder="Tiêu đề..." value={title} onChange={e=>setTitle(e.target.value)} />
        <select value={priority} onChange={e=>setPriority(e.target.value)}>
          <option value={1}>Low</option><option value={2}>Medium</option><option value={3}>High</option>
        </select>
        <input type="date" value={due} onChange={e=>setDue(e.target.value)} />
        <input placeholder="tags, phân, cách, dấu, phẩy" value={tagInput} onChange={e=>setTagInput(e.target.value)} />
        <button className="primary">Thêm</button>
      </form>

      <ul>
        {ids.map(id=>{
          const t = map[id];
          return (
            <li key={id} className={t.completed? "done": ""}>
              <div className="title">
                <input type="checkbox" checked={t.completed} onChange={()=>dispatch(toggleTodo(t.id))}/>
                <span>{t.title}</span>
              </div>
              <div className="flex">
                {t.dueDate && <span className="badge">{new Date(t.dueDate).toLocaleDateString()}</span>}
                <span className="badge">P{t.priority}</span>
                <button onClick={()=>dispatch(removeTodo(t.id))}>Xoá</button>
              </div>
            </li>
          );
        })}
      </ul>
      {ids.length===0 && <div className="empty">Không có task.</div>}
    </div>
  );
}
