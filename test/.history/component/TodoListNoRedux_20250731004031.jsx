import { useState } from "react";

const TodoListNoRedux = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => () => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h1>Todo List without No Redux</h1>
      <form action="">
        <input
          type="text"
          placeholder="Add a new todo"
          name="task"
          onChange={handleChange}
        />
        <button type="submit">{editId ? "Edit" : "Add"}</button>
      </form>

      <div>
        <h1>Todo List</h1>
        {todos.map((item) => (
          <div key={item.id}>
            <span>{item.task}</span>
            <button onClick={() => setEditId(item.id)}>Edit</button>
            <button onClick={handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoListNoRedux;
