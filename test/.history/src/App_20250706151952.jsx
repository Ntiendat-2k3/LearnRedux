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
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        onChange={handleChange}
      />
      <input type="text" name="category" placeholder="Category" />
      <textarea placeholder="Description" name="description"></textarea>
    </form>
  );
};

export default App;
