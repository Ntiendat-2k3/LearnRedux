import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from "../store/productSlice";
import styles from "./ProductList.module.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null); // mới thêm để biết đang sửa ai

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateProduct({ id: editingId, ...formData })); // truyền đủ dữ liệu
    } else {
      dispatch(addProduct(formData));
    }
    setFormData({ name: "", price: 0, category: "", description: "" });
    setEditingId(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleEdit = (product) => {
    // setFormData({
    //   name: product.name,
    //   price: product.price,
    //   category: product.category,
    //   description: product.description,
    // });
    // cách ngắn hơn
    setFormData(product);
    setEditingId(product.id); // chuyển sang mode "edit"
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Danh sách sản phẩm</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="number"
          name="price"
          placeholder="Giá"
          value={formData.price}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="category"
          placeholder="Danh mục"
          value={formData.category}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="description"
          placeholder="Mô tả"
          value={formData.description}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          {editingId ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </button>
      </form>

      <ul className={styles.list}>
        {products.map((product) => (
          <li key={product.id} className={styles.item}>
            <div className={styles.itemInfo}>
              <strong>{product.name}</strong> - {product.price.toLocaleString()}
              đ - {product.category} - {product.description}
            </div>
            <div>
              <button
                onClick={() => handleEdit(product)}
                className={styles.editButton}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
