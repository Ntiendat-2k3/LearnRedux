// 📁 src/store/kanbanSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  boards: {
    "board-1": {
      id: "board-1",
      title: "Project Alpha",
      lists: {
        "list-1": {
          id: "list-1",
          title: "Todo",
          taskIds: ["task-1", "task-2"],
        },
        "list-2": { id: "list-2", title: "Doing", taskIds: ["task-3"] },
      },
      listOrder: ["list-1", "list-2"],
    },
  },
  boardOrder: ["board-1"],
  tasks: {
    "task-1": { id: "task-1", content: "Setup project" },
    "task-2": { id: "task-2", content: "Design UI" },
    "task-3": { id: "task-3", content: "Implement logic" },
  },
  currentBoardId: "board-1",
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    moveTask: (state, action) => {
      const board = state.boards[state.currentBoardId];
      const { source, destination } = action.payload;
      if (!destination) return;
      const sourceList = board.lists[source.droppableId];
      const destList = board.lists[destination.droppableId];
      const [movedTaskId] = sourceList.taskIds.splice(source.index, 1);
      destList.taskIds.splice(destination.index, 0, movedTaskId);
    },
    setCurrentBoard: (state, action) => {
      state.currentBoardId = action.payload;
    },
    addBoard: (state, action) => {
      const id = `board-${nanoid()}`;
      state.boards[id] = {
        id,
        title: action.payload.title,
        lists: {},
        listOrder: [],
      };
      state.boardOrder.push(id);
    },
    addList: (state, action) => {
      const id = `list-${nanoid()}`;
      const board = state.boards[state.currentBoardId];
      board.lists[id] = { id, title: action.payload.title, taskIds: [] };
      board.listOrder.push(id);
    },
    addTask: (state, action) => {
      const id = `task-${nanoid()}`;
      state.tasks[id] = { id, content: action.payload.content };
      const board = state.boards[state.currentBoardId];
      board.lists[action.payload.listId].taskIds.push(id);
    },
  },
});

export const { moveTask, setCurrentBoard, addBoard, addList, addTask } =
  kanbanSlice.actions;
export default kanbanSlice.reducer;
