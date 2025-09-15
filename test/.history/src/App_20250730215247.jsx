const App = () => {
  return (
    <div>
      <form action="">
        <h1>Quản lý sản phẩm</h1>
        <input type="text" name="name" placeholder="Tên sản phẩm" />
        <input type="number" name="price" placeholder="Giá" />
        <input type="text" name="category" placeholder="Danh mục" />
        <input type="text" name="description" placeholder="Mô tả" />
        <button type="submit">Thêm sản phẩm</button>
      </form>
    </div>
  );
};

export default App;
