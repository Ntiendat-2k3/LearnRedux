import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProjects, selectProjectIds, selectSelectedProjectId } from "../features/selectors";
import { projectsActions } from "../features/projects/projectsSlice";

export default function Sidebar(){
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const ids = useSelector(selectProjectIds);
  const selected = useSelector(selectSelectedProjectId);
  const [name,setName] = useState("");

  function add(e){
    e.preventDefault();
    if (!name.trim()) return;
    const color = `hsl(${Math.floor(Math.random()*360)} 70% 45%)`;
    dispatch(projectsActions.addProject({ name:name.trim(), color }));
    setName("");
  }

  return (
    <div className="sidebar">
      <h2>Projects</h2>
      <ul>
        {["today","inbox", ...ids.filter(id=>!["inbox","today"].includes(id))].map(id=>{
          const p = projects[id]; if(!p) return null;
          return (
            <li key={id} className={"project-item "+(selected===id?"active":"")} onClick={()=>dispatch(projectsActions.selectProject(id))}>
              <span className="dot" style={{background:p.color}}/>
              <span>{p.name}</span>
            </li>
          );
        })}
      </ul>
      <form onSubmit={add} className="row" style={{marginTop:8}}>
        <input placeholder="Tên project mới" value={name} onChange={e=>setName(e.target.value)} />
        <button>Thêm</button>
      </form>
    </div>
  );
}
