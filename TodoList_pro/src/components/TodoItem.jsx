/**
 * TodoItem: hiển thị một task + các hành động nhanh
 * - Toggle hoàn tất, sửa, xoá
 * - Hiển thị priority, due date, tags
 * - Subtasks: toggle/xoá từng subtask
 * - Mở TodoEditor (lazy) để chỉnh sửa chi tiết
 */
import React, { useState, Suspense } from "react";
import { useDispatch } from "react-redux";
import { CalendarDays, Hash, Pencil, Trash2, Flag, CheckCircle2, Circle } from "lucide-react";

export default function TodoItem({ todo }){
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);

  if (!todo) return null;

  function toggle(){ dispatch({ type:"todos/toggleTodo", payload: todo.id }); }
  function remove(){ if (confirm("Xoá task này?")) dispatch({ type:"todos/removeTodo", payload: todo.id }); }

  const priorityText = ["","Low","Med","High"][todo.priority] || "";

  return (
    <div className={"todo-item " + (todo.completed?"done":"") }>
      <button className="check" onClick={toggle} title="Toggle">
        {todo.completed ? <CheckCircle2 size={20}/> : <Circle size={20}/>} 
      </button>

      <div className="meta">
        <div className="title-row">
          <span className="title">{todo.title}</span>
          {todo.priority && <span className={"badge p"+todo.priority}><Flag size={12}/> {priorityText}</span>}
          {todo.dueDate && <span className="badge"><CalendarDays size={12}/> {new Date(todo.dueDate).toLocaleDateString()}</span>}
        </div>
        {todo.description && <div className="desc">{todo.description}</div>}
        <div className="tags">
          {todo.tags?.map(tag => <span key={tag} className="tag"><Hash size={12}/> {tag}</span>)}
        </div>
        {todo.subtasks?.length>0 && (
          <details className="subs">
            <summary>{todo.subtasks.filter(s=>s.done).length}/{todo.subtasks.length} subtask</summary>
            <ul>
              {todo.subtasks.map(s => (
                <li key={s.id}>
                  <label>
                    <input type="checkbox" checked={s.done} onChange={()=>dispatch({ type:"todos/toggleSubtask", payload:{ todoId: todo.id, subtaskId: s.id } })} />
                    <span className={s.done?"line":undefined}>{s.title}</span>
                  </label>
                  <button className="icon" onClick={()=>dispatch({ type:"todos/removeSubtask", payload:{ todoId: todo.id, subtaskId: s.id } })}><Trash2 size={14}/></button>
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>

      <div className="actions">
        <button className="icon" onClick={()=>setEditing(true)} title="Sửa"><Pencil size={16}/></button>
        <button className="icon" onClick={remove} title="Xoá"><Trash2 size={16}/></button>
      </div>

      {editing && (
        <Suspense fallback={null}>
          <TodoEditor existing={todo} onClose={()=>setEditing(false)} />
        </Suspense>
      )}
    </div>
  );
}

// Lazy import để tránh vòng lặp import và tối ưu tải
const TodoEditor = React.lazy(() => import("./TodoEditor"));
