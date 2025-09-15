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

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={product.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Product price"
          value={product.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Product category"
          value={product.category}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Product description"
          value={product.description}
          onChange={handleChange}
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
