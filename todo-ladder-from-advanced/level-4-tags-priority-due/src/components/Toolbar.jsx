import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAll } from "../features/filters/filtersSlice";
import { selectFilters, selectAllTags } from "../features/selectors";

export default function Toolbar(){
  const dispatch = useDispatch();
  const f = useSelector(selectFilters);
  const tags = useSelector(selectAllTags);

  function set(p){ dispatch(setAll(p)); }

  return (
    <div className="card">
      <h2>Filters</h2>
      <div className="controls">
        <select value={f.status} onChange={e=>set({ status:e.target.value })}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
          <option value="dueWeek">This Week</option>
        </select>
        <select value={f.sortBy} onChange={e=>set({ sortBy:e.target.value })}>
          <option value="manual">Manual</option>
          <option value="dueDate">Due</option>
          <option value="priority">Priority</option>
          <option value="createdAt">Created</option>
          <option value="title">Title</option>
        </select>
        <select value={f.sortDir} onChange={e=>set({ sortDir:e.target.value })}>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        <label className="flex"><input type="checkbox" checked={f.hideCompleted} onChange={e=>set({ hideCompleted:e.target.checked })}/>Ẩn hoàn tất</label>
        <input className="search" placeholder="Tìm kiếm..." value={f.search} onChange={e=>set({ search:e.target.value })} />
      </div>

      <div className="controls">
        {tags.map(tag=>{
          const active = f.tags.includes(tag);
          return (
            <label key={tag} className="tag">
              <input type="checkbox" checked={active} onChange={(e)=>{
                const setTags = new Set(f.tags);
                e.target.checked? setTags.add(tag): setTags.delete(tag);
                set({ tags: Array.from(setTags) });
              }} />
              #{tag}
            </label>
          );
        })}
      </div>
    </div>
  );
}
