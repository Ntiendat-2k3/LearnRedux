import React from "react";

const App = () => {
  const [editingId, setEditingId] = React.useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <h1>Quản lý sản phẩm</h1>
        <input type="text" name="name" placeholder="Tên sản phẩm" />
        <input type="number" name="price" placeholder="Giá" />
        <input type="text" name="category" placeholder="Danh mục" />
        <input type="text" name="description" placeholder="Mô tả" />
        <button type="submit">Thêm sản phẩm</button>
      </form>

      <div>
        <h1>Danh sach san pham</h1>
      </div>
    </div>
  );
};

export default App;
