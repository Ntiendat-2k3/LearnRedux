const TodoList = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const input = event.target.querySelector('input');
  return (
    <div>
      <h1>Todo List</h1>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder="Add a new todo" />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default TodoList;
