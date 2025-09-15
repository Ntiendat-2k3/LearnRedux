import React from "react";

const App = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    price: 0,
    category: "",
    description: "",
  });
  const [editingId, setEditingId] = React.useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <h1>Quản lý sản phẩm</h1>
        <input type="text" name="name" placeholder="Tên sản phẩm" />
        <input type="number" name="price" placeholder="Giá" />
        <input type="text" name="category" placeholder="Danh mục" />
        <input type="text" name="description" placeholder="Mô tả" />
        <button type="submit">{editingId ? "Sửa" : "Thêm"}</button>
      </form>

      <div>
        <h1>Danh sach san pham</h1>
      </div>
    </div>
  );
};

export default App;
