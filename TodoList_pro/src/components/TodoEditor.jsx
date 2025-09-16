/**
 * TodoEditor: modal form để thêm/sửa task
 * - Trường: title, description, project, priority, due date, tags, subtasks
 * - Khi lưu: nếu có existing => update; ngược lại => add
 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProjects, selectSelectedProjectId, selectAllTags } from "../features/selectors";

export default function TodoEditor({ existing, onClose }){
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const selected = useSelector(selectSelectedProjectId);
  const tagPool = useSelector(selectAllTags);

  const [title, setTitle] = useState(existing?.title ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [projectId, setProjectId] = useState(existing?.projectId ?? (selected || "inbox"));
  const [priority, setPriority] = useState(existing?.priority ?? 2);
  const [dueDate, setDueDate] = useState(existing?.dueDate ? new Date(existing.dueDate).toISOString().slice(0,10) : "");
  const [tags, setTags] = useState(existing?.tags ?? []);
  const [subTitle, setSubTitle] = useState("");
  const [subtasks, setSubtasks] = useState(existing?.subtasks ?? []);

  function addSub(){
    if (!subTitle.trim()) return;
    setSubtasks([...subtasks, { id: crypto.randomUUID?.() || Date.now().toString(), title: subTitle.trim(), done: false }]);
    setSubTitle("");
  }
  function removeSub(id){ setSubtasks(subtasks.filter(s=>s.id!==id)); }

  function submit(e){
    e.preventDefault();
    if (!title.trim()) return;
    const payload = {
      title: title.trim(), description: description.trim(), projectId,
      priority: Number(priority), dueDate: dueDate? new Date(dueDate).getTime() : null, tags, subtasks: subtasks.map(s=>s.title)
    };
    if (existing) dispatch({ type:"todos/updateTodo", payload:{ id: existing.id, changes: { ...payload, subtasks } }});
    else dispatch({ type:"todos/addTodo", payload });
    onClose?.();
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <h3>{existing?"Sửa Task":"Task mới"}</h3>
        <form onSubmit={submit} className="form-grid">
          <input autoFocus placeholder="Tiêu đề" value={title} onChange={e=>setTitle(e.target.value)} />
          <textarea placeholder="Mô tả…" value={description} onChange={e=>setDescription(e.target.value)} />

          <div className="row">
            <label>Project</label>
            <select value={projectId} onChange={e=>setProjectId(e.target.value)}>
              {Object.values(projects).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>

          <div className="row">
            <label>Ưu tiên</label>
            <select value={priority} onChange={e=>setPriority(e.target.value)}>
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
            </select>
          </div>

          <div className="row">
            <label>Hạn chót</label>
            <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} />
          </div>

          <div className="row">
            <label>Tags</label>
            <TagPicker value={tags} onChange={setTags} suggestions={tagPool} />
          </div>

          <div className="subtasks">
            <label>Subtasks</label>
            <div className="sub-add">
              <input value={subTitle} onChange={e=>setSubTitle(e.target.value)} placeholder="Tên subtask" />
              <button type="button" onClick={addSub}>Thêm</button>
            </div>
            <ul>
              {subtasks.map(s => (
                <li key={s.id}>
                  <span>{s.title}</span>
                  <button type="button" onClick={()=>removeSub(s.id)}>×</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="actions">
            <button className="primary" type="submit">Lưu</button>
            <button type="button" onClick={onClose}>Huỷ</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TagPicker({ value, onChange, suggestions=[] }){
  const [input, setInput] = useState("");
  const [listOpen, setListOpen] = useState(false);

  function add(tag){
    tag = tag.trim();
    if (!tag) return;
    if (!value.includes(tag)) onChange([...value, tag]);
    setInput("");
  }
  function remove(tag){ onChange(value.filter(t=>t!==tag)); }

  const filtered = suggestions
    .filter(t => t.toLowerCase().includes(input.toLowerCase()) && !value.includes(t))
    .slice(0,5);

  return (
    <div className="tagpicker">
      <div className="chips">
        {value.map(tag => <span key={tag} className="chip">#{tag}<button onClick={()=>remove(tag)}>×</button></span>)}
        <input
          value={input}
          onChange={e=>setInput(e.target.value)}
          onFocus={()=>setListOpen(true)}
          placeholder="Thêm tag"
          onKeyDown={e=>{ if (e.key==='Enter'){ e.preventDefault(); add(input); }}}
        />
        <button type="button" onClick={()=>add(input)}>Thêm</button>
      </div>
      {listOpen && filtered.length>0 && (
        <div className="suggest">
          {filtered.map(t => <button key={t} type="button" onClick={()=>add(t)}>#{t}</button>)}
        </div>
      )}
    </div>
  );
}
