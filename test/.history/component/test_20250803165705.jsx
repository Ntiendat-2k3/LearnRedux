import React from "react";

const Test = () => {
  const [products, setProducts] = React.useState([]);
  const [product, setProduct] = React.useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const [editingId, setEditingId] = React.useState(null);

  const handleChange = (event) => {};

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product name"
          onChange={handleChange}
        />
        <input type="number" name="price" placeholder="Product price" />
        <input type="text" name="category" placeholder="Product category" />
        <input
          type="text"
          name="description"
          placeholder="Product description"
        />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
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
