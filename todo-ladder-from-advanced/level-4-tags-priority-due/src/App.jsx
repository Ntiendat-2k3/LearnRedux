import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar";
import TodoList from "./components/TodoList";
import { projectsActions } from "./features/projects/projectsSlice";

export default function App(){
  const dispatch = useDispatch();
  useEffect(()=>{ dispatch(projectsActions.bootstrap()); }, [dispatch]);

  return (
    <div className="container grid grid-2">
      <Sidebar/>
      <div className="grid">
        <Toolbar/>
        <TodoList/>
      </div>
    </div>
  );
}
