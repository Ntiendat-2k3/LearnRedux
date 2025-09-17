import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todosReducer from "./features/todos/todosSlice";
import projectsReducer from "./features/projects/projectsSlice";
import filtersReducer from "./features/filters/filtersSlice";
export const store = configureStore({ reducer: combineReducers({ todos: todosReducer, projects: projectsReducer, filters: filtersReducer }) });
