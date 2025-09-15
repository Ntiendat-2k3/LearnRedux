import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, updateProduct } from "../src/store/productSlice";

const Test = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.items);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingId) {
      dispatch(updateProduct({ editingId, ...product }));
      setEditingId(null);
    } else {
      setProducts([...products, { ...product, id: Date.now() }]);
    }

    setProduct({
      name: "",
      price: "",
      category: "",
      description: "",
    });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setProduct(item);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
