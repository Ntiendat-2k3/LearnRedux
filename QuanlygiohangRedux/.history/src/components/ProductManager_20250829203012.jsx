import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import { useState } from "react";
import styles from ".../styles/ProductManager.module.css";

export default function ProductManager() {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ id: "", name: "", price: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

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
    <div className={styles.container}>
      <h2 className={styles.title}>📦 Quản lý sản phẩm</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          name="name"
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className={styles.input}
          name="price"
          placeholder="Giá sản phẩm"
          type="number"
          value={form.price}
          onChange={handleChange}
        />
        <button className={styles.submitButton} type="submit">
          {form.id ? "Cập nhật" : "Thêm sản phẩm"}
        </button>
      </form>

      <ul className={styles.list}>
        {products.map((p) => (
          <li key={p.id} className={styles.item}>
            <div className={styles.itemInfo}>
              <span className={styles.productName}>{p.name}</span>
              <span className={styles.productPrice}>
                {p.price.toLocaleString("vi-VN")}₫
              </span>
            </div>
            <div className={styles.actions}>
              <button
                className={`${styles.button} ${styles.cartButton}`}
                onClick={() =>
                  dispatch(
                    addToCart({ id: p.id, name: p.name, price: p.price })
                  )
                }
                title="Thêm vào giỏ hàng"
              >
                🛒
              </button>
              <button
                className={`${styles.button} ${styles.editButton}`}
                onClick={() => handleEdit(p)}
                title="Chỉnh sửa"
              >
                ✏️
              </button>
              <button
                className={`${styles.button} ${styles.deleteButton}`}
                onClick={() => dispatch(deleteProduct(p.id))}
                title="Xóa sản phẩm"
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
