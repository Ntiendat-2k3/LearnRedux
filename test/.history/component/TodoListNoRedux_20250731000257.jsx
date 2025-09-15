import { useState } from "react";

const TodoListNoRedux = () => {
  const [editId, setEditId] = useState(null);

  return (
    <div>
      <h1>Todo List without No Redux</h1>
      <form action="">
        <input type="text" placeholder="Add a new todo" />
        <button type="submit">{editId ? "Edit" : "Add"}</button>
      </form>
    </div>
  );
};

export default TodoListNoRedux;
