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

  const handleSubmit = (e) => {
    e.preventDefault();
    const price = parseFloat(form.price);
    if (!form.name || isNaN(price)) return;

    if (form.id) {
      dispatch(updateProduct({ ...form, price }));
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
          placeholder="Tên"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <input
          placeholder="Giá"
          type="number"
          value={form.price}
          onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
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
