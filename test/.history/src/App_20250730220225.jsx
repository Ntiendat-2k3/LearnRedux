import React from "react";
import { addProduct } from "./store/productSlice";

const App = () => {
  const dispatch = React.useDispatch();
  const products = React.useSelector((state) => state.product.items);

  const [formData, setFormData] = React.useState({
    name: "",
    price: 0,
    category: "",
    description: "",
  });
  const [editingId, setEditingId] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingId) {
      dispatch(updateProduct({ id: editingId, ...formData }));
    } else {
      dispatch(addProduct(formData));
    }
    setFormData({ name: "", price: 0, category: "", description: "" });
    setEditingId(null);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
    });
    setEditingId(product.id);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <h1>Quản lý sản phẩm</h1>
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Giá"
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Danh mục"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Mô tả"
          onChange={handleChange}
        />
        <button type="submit">{editingId ? "Sửa" : "Thêm"}</button>
      </form>

      <div>
        <h1>Danh sach san pham</h1>
        {products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>Giá: {product.price.toLocaleString()} VND</p>
            <p>Danh mục: {product.category}</p>
            <p>Mô tả: {product.description}</p>
            <button onClick={() => handleEdit(product)}>Sửa</button>
            <button onClick={() => handleDelete(product.id)}>Xóa</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
