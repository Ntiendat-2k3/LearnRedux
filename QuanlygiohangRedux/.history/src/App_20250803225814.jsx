import React from "react";
import BoardSelector from "./components/BoardSelector";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BoardSelector />
      <KanbanBoard />
    </div>
  );
}

export default App;
