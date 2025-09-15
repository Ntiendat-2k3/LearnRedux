import { useState } from "react";

const ProductListNoRedux = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      setProducts(
        products.map((item) =>
          item.id === product.id ? { ...item, ...product } : item
        )
      );
      setIsEdit(false);
    } else {
      setProducts([...products, { ...product, id: Date.now() }]);
    }
    setProduct({ name: "", price: "", description: "" });
  };

  const handleEdit = (item) => () => {
    setProduct(item);
    setIsEdit(true);
  };

  const handleDelete = (id) => () => {
    setProducts(products.filter((item) => item.id !== id));
  };

  const handelChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <h1>Product List (No Redux)</h1>
        <input
          type="text"
          name="name"
          placeholder="Ten san pham"
          onChange={handelChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Gia san pham"
          onChange={handelChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Mo ta san pham"
          onChange={handelChange}
        />
        <button>{isEdit ? "Cap nhat" : "Them"}</button>
      </form>

      <div>
        <h1>Danh sach san pham</h1>
        <table>
          <thead>
            <tr>
              <th>Ten san pham</th>
              <th>Gia san pham</th>
              <th>Mo ta san pham</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                  <button onClick={handleEdit(item)}>Sua</button>
                  <button onClick={handleDelete(item.id)}>Xoa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListNoRedux;
