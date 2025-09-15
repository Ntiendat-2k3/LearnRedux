const Test = () => {
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product name" />
        <input type="number" name="price" placeholder="Product price" />
        <input type="text" name="category" placeholder="Product category" />
        <input
          type="text"
          name="description"
          placeholder="Product description"
        />
        <button type="submit">Submit</button>
      </form>

      <h1>List</h1>
      <ul>
        {products.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price} - {item.category}
            <button onClick={handleEdit(item)}>Edit</button>
            <button onClick={handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
