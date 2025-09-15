import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct, updateProduct } from "./store/productSlice";

const App = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.items);

  const [form, setForm] = useState({
    name: "",
    price: 0,
    category: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateProduct({ id: editingId, ...form }));
    } else {
      dispatch(addProduct(form));
    }
    setForm({
      name: "",
      price: 0,
      category: "",
      description: "",
    });
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    if (editingId === id) {
      setEditingId(null);
      setForm({ name: "", price: 0, category: "", description: "" });
    }
  };

  const handleEditClick = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
    });
    setEditingId(product.id);
  };

  return (
    <div>
      <h2>{editingId ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        <textarea
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        ></textarea>
        <button type="submit">{editingId ? "Save" : "Add"}</button>
      </form>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.category}</p>
            <p>
              {product.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <img
              src={product.image || "/placeholder.svg?height=200&width=200"}
              alt={product.name}
              width="200"
            />
            <br />
            <button onClick={() => handleDelete(product.id)}>Delete</button>
            <button onClick={() => handleEditClick(product)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
