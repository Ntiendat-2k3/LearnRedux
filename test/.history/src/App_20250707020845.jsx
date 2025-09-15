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
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleUpdate = (product) => {
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
      <form action="" onSubmit={handleSubmit}>
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
        <button>Add</button>
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
            <img src={product.image} alt={product.name} />
            <button onClick={() => handleDelete(product.id)}>Delete</button>
            <button onClick={() => handleUpdate(product.id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
