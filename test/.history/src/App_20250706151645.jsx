import { useState } from "react";

const App = () => {
  const [form, setForm] = useState({
    name: "",
    price: 0,
    category: "",
    description: "",
  });

  return (
    <form action="">
      <input type="text" placeholder="Name" />
      <input type="number" placeholder="Price" />
      <input type="text" placeholder="Category" />
      <textarea placeholder="Description"></textarea>
    </form>
  );
};

export default App;
