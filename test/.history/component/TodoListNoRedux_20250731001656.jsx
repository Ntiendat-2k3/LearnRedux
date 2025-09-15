import { useState } from "react";

const TodoListNoRedux = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setTask(...task, [e.target.name]: e.target.value);
  };

  return (
    <div>
      <h1>Todo List without No Redux</h1>
      <form action="">
        <input type="text" placeholder="Add a new todo" name="task" />
        <button type="submit">{editId ? "Edit" : "Add"}</button>
      </form>

      <div>
        <h1>Todo List</h1>
      </div>
    </div>
  );
};

export default TodoListNoRedux;
