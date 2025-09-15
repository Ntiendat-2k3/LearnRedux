import { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    if (editingId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, text: task } : todo
        )
      );
      setEditingId(null);
    } else {
      const newTodo = {
        id: new Date().getTime(),
        text: task,
        completed: false,
      };
      setTodos([...todos, newTodo]);
    }

    setTask("");
  };

  const handleEdit = (todo) => {
    setTask(todo.text);
    setEditingId(todo.id);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Todo List (useState)</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Nhập công việc"
        />
        <button type="submit">{editingId ? "Cập nhật" : "Thêm"}</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
            <button onClick={() => toggleComplete(todo.id)}>✔</button>
            <button onClick={() => handleEdit(todo)}>✏</button>
            <button onClick={() => handleDelete(todo.id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
