import { createSelector } from "@reduxjs/toolkit";
import { isSameDay, isWithinInterval, startOfToday, startOfWeek, endOfWeek } from "date-fns";

export const selectProjects = s => s.projects.entities;
export const selectProjectIds = s => s.projects.ids;
export const selectSelectedProjectId = s => s.projects.selectedId;
export const selectTodosMap = s => s.todos.entities;
export const selectTodoIds = s => s.todos.ids;
export const selectFilters = s => s.filters;

export const selectAllTags = createSelector([selectTodosMap], (map)=>{
  const set=new Set(); Object.values(map).forEach(t=>t?.tags?.forEach(tag=>set.add(tag))); return Array.from(set).sort();
});

export const selectVisibleTodoIds = createSelector(
  [selectTodosMap, selectTodoIds, selectSelectedProjectId, selectFilters],
  (map, ids, pid, f)=>{
    const today = new Date();
    const startWeek = startOfWeek(today, { weekStartsOn:1 }); const endWeek = endOfWeek(today, { weekStartsOn:1 });
    let list = ids.map(id=>map[id]).filter(Boolean);
    if (pid && pid!=="today") list = list.filter(t=>t.projectId===pid);
    if (pid==="today") list = list.filter(t=> (t.dueDate && isSameDay(new Date(t.dueDate), today)) || isSameDay(new Date(t.createdAt), today));
    const q = f.search.trim().toLowerCase(); if (q) list = list.filter(t=>(t.title+" "+(t.description||"")).toLowerCase().includes(q));
    if (f.status==="active") list = list.filter(t=>!t.completed);
    if (f.status==="completed") list = list.filter(t=>t.completed);
    if (f.status==="overdue") list = list.filter(t=>!t.completed && t.dueDate && new Date(t.dueDate) < startOfToday());
    if (f.status==="dueWeek") list = list.filter(t=>t.dueDate && isWithinInterval(new Date(t.dueDate), { start:startWeek, end:endWeek }));
    list = list.filter(t=>f.priorities.includes(t.priority));
    if (f.tags?.length) list = list.filter(t=> f.tags.every(tag=>t.tags.includes(tag)));
    if (f.hideCompleted) list = list.filter(t=>!t.completed);
    const dir = f.sortDir==="asc" ? 1 : -1;
    const cmp = { manual:(a,b)=>(a.order-b.order)*dir, dueDate:(a,b)=>((a.dueDate??Infinity)-(b.dueDate??Infinity))*dir, priority:(a,b)=>(a.priority-b.priority)*dir, createdAt:(a,b)=>(a.createdAt-b.createdAt)*dir, title:(a,b)=>a.title.localeCompare(b.title)*dir }[f.sortBy] ?? (()=>0);
    list.sort(cmp);
    return list.map(t=>t.id);
  }
);
