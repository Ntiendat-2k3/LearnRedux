import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "./store/productSlice";

const App = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    price: 0,
    category: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(form));
    setForm({
      name: "",
      price: 0,
      category: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    const
  };

  return (
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
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        onChange={handleChange}
      />
      <textarea
        placeholder="Description"
        name="description"
        onChange={handleChange}
      ></textarea>
    </form>
  );
};

export default App;
