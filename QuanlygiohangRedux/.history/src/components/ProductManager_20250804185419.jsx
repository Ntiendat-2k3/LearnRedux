// src/components/ProductManager.js
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import { useState } from "react";

export default function ProductManager() {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ id: "", name: "", price: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // setForm((f) => ...) tránh bug do closure
    // [name]: đây là field name trong input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const price = parseFloat(form.price);
    if (!form.name || isNaN(price)) return;

    if (form.id) {
      dispatch(updateProduct({ ...form, price }));
      // vì form chưa name mới rồi, nhưng phải truyền price vì price trong form là string, chuẩn hóa lại về float thì phải truyền lại
    } else {
      dispatch(addProduct({ name: form.name, price }));
    }

    setForm({ id: "", name: "", price: "" });
  };

  const handleEdit = (p) => {
    setForm(p);
  };

  return (
    <div>
      <h2>📦 Quản lý sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Tên"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Giá"
          type="number"
          value={form.price}
          onChange={handleChange}
        />
        <button type="submit">{form.id ? "Cập nhật" : "Thêm"}</button>
      </form>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.price}₫
            <button
              onClick={() =>
                dispatch(addToCart({ id: p.id, name: p.name, price: p.price }))
              }
            >
              🛒
            </button>
            <button onClick={() => handleEdit(p)}>✏️</button>
            <button onClick={() => dispatch(deleteProduct(p.id))}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
