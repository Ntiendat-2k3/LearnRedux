import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "./store/productSlice";

const App = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "books",
  });

  const handleAddProduct = (event) => {
    event.preventDefault();
    dispatch(addProduct(form));

    setForm({
      name: "",
      price: "",
      description: "",
      category: "books",
    });
  };

  const handleDeleteProduct = (id) => {
    // Dispatch delete action here
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={handleAddProduct}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          price:
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <br />
        <label>
          Category:
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="books">Books</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="toys">Toys</option>
            <option value="sports">Sports</option>
            <option value="beauty">Beauty</option>
            <option value="automotive">Automotive</option>
            <option value="food">Food</option>
          </select>
        </label>
        <br />
        <button type="submit">Add</button>
      </form>

      <h1>List</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <div>
            <strong>Price:</strong> ${product.price}
          </div>
          <div>
            <strong>Description:</strong> {product.description}
          </div>
          <div>
            <strong>Category:</strong> {product.category}
          </div>
          <div>
            <strong>ID:</strong> {product.id}
          </div>
          <div>
            <button>Delete</button>
            <button>Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
