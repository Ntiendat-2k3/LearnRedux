/**
 * Toolbar: điều khiển filter/sort, bulk actions, undo/redo, import/export
 * - Search, status, sortBy/sortDir, hideCompleted, tag filter
 * - Bulk: complete all visible, clear completed
 * - Import/Export JSON qua localStorage
 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAll } from "../features/filters/filtersSlice";
import { AppActions } from "../store";
import { selectFilters, selectAllTags, selectVisibleTodoIds } from "../features/selectors";
import { ChevronDown, Filter, Undo2, Redo2, Trash2, CheckCheck, Upload, Download } from "lucide-react";

export default function Toolbar() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const allTags = useSelector(selectAllTags);
  const visibleIds = useSelector(selectVisibleTodoIds);
  const [importing, setImporting] = useState(false);

  /** Xuất JSON state hiện tại (present) để backup/chia sẻ */
  function exportJSON() {
    const data = JSON.stringify({ state: JSON.parse(localStorage.getItem("redux_todo_advanced_v1")) }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), { href: url, download: `todos-${Date.now()}.json` });
    a.click(); URL.revokeObjectURL(url);
  }

  /** Nhập JSON: ghi đè localStorage rồi reload trang */
  function importJSON(e) {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result);
        if (json?.state) {
          localStorage.setItem("redux_todo_advanced_v1", JSON.stringify(json.state));
          location.reload();
        }
      } catch (_) {}
    };
    reader.readAsText(file);
  }

  const statusOptions = [
    { value:"all", label:"All" },
    { value:"active", label:"Active" },
    { value:"completed", label:"Completed" },
    { value:"overdue", label:"Overdue" },
    { value:"dueToday", label:"Due Today" },
    { value:"dueWeek", label:"This Week" },
  ];

  const sortOptions = [
    { value:"manual", label:"Manual" },
    { value:"dueDate", label:"Due Date" },
    { value:"priority", label:"Priority" },
    { value:"createdAt", label:"Created" },
    { value:"title", label:"Title" },
  ];

  return (
    <div className="toolbar-grid">
      <input className="search" placeholder="Tìm kiếm… (tiêu đề/mô tả)" value={filters.search}
             onChange={e=>dispatch(setAll({ search: e.target.value }))} />

      <select value={filters.status} onChange={e=>dispatch(setAll({ status: e.target.value }))}>
        {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>

      <select value={filters.sortBy} onChange={e=>dispatch(setAll({ sortBy: e.target.value }))}>
        {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>

      <select value={filters.sortDir} onChange={e=>dispatch(setAll({ sortDir: e.target.value }))}>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>

      <label className="checkbox">
        <input type="checkbox" checked={filters.hideCompleted}
               onChange={e=>dispatch(setAll({ hideCompleted: e.target.checked }))} />
        Ẩn task đã hoàn tất
      </label>

      <div className="btn-row">
        <button title="Undo" onClick={()=>dispatch(AppActions.undo())}><Undo2 size={16}/></button>
        <button title="Redo" onClick={()=>dispatch(AppActions.redo())}><Redo2 size={16}/></button>
        <button title="Complete All Visible" onClick={()=>dispatch({ type:"todos/bulkToggle", payload:{ ids: visibleIds, completed:true }})}><CheckCheck size={16}/></button>
        <button title="Delete Completed" onClick={()=>dispatch({ type:"todos/clearCompleted", payload:{} })}><Trash2 size={16}/></button>

        <button onClick={exportJSON} title="Export JSON"><Download size={16}/></button>
        <label className="import-btn" title="Import JSON">
          <Upload size={16}/>
          <input type="file" accept="application/json" onChange={importJSON} hidden />
        </label>
      </div>

      <div className="tag-filter">
        <Filter size={14}/>
        {allTags.map(tag => (
          <label key={tag} className={"tag-chip " + (filters.tags.includes(tag)?"active":"") }>
            <input type="checkbox" checked={filters.tags.includes(tag)} onChange={(e)=>{
              const set = new Set(filters.tags);
              e.target.checked ? set.add(tag) : set.delete(tag);
              dispatch(setAll({ tags: Array.from(set) }));
            }} />
            <span>#{tag}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
