import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct, updateProduct } from "./store/productSlice";

const App = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.items);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateProduct{ id: editingId, ...form });
    } else {
      dispatch(addProduct(form));
    }
    setForm({
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
    });
    setEditingId(null);
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
