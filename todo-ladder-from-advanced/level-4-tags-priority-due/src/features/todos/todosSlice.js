import { createSlice, nanoid } from "@reduxjs/toolkit";
/** Level 4: todo có priority(1-3), dueDate, tags[], order */
const todosSlice = createSlice({
  name: "todos",
  initialState: { entities:{}, ids:[] },
  reducers: {
    addTodo: {
      reducer(state, action){
        const t = action.payload;
        state.entities[t.id]=t; state.ids.unshift(t.id);
      },
      prepare({ title, description="", projectId="inbox", priority=2, dueDate=null, tags=[] }){
        const id = nanoid();
        return { payload:{ id, title:title.trim(), description, completed:false, projectId, priority, dueDate, tags, createdAt:Date.now(), updatedAt:Date.now(), order:Date.now() } };
      }
    },
    toggleTodo(state, action){
      const t = state.entities[action.payload];
      if (t){ t.completed = !t.completed; t.updatedAt=Date.now(); }
    },
    removeTodo(state, action){
      const id = action.payload; delete state.entities[id]; state.ids = state.ids.filter(x=>x!==id);
    },
    updateTodo(state, action){
      const { id, changes } = action.payload;
      const t = state.entities[id]; if (!t) return;
      Object.assign(t, changes); t.updatedAt=Date.now();
    }
  }
});
export const { addTodo, toggleTodo, removeTodo, updateTodo } = todosSlice.actions;
export default todosSlice.reducer;
