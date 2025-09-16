/**
 * App: gắn kết các phần của Layout, khởi tạo 2 project mặc định khi mount.
 */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar";
import TodoList from "./components/TodoList";
import StatsBar from "./components/StatsBar";
import { projectsActions } from "./features/projects/projectsSlice";

export default function App(){
  const dispatch = useDispatch();
  useEffect(()=>{ dispatch(projectsActions.bootstrap()); }, [dispatch]);

  return (
    <Layout
      sidebar={<Sidebar/>}
      toolbar={<Toolbar/>}
      main={<TodoList/>}
      footer={<StatsBar/>}
    />
  );
}
