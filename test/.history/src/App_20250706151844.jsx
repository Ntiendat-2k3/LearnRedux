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

  return (
    <form action="" onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" />
      <input type="number" placeholder="Price" />
      <input type="text" placeholder="Category" />
      <textarea placeholder="Description"></textarea>
    </form>
  );
};

export default App;
