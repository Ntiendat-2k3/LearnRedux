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
                  <button
                    onClick={() => {
                      setProduct(item);
                      setIsEdit(true);
                    }}
                  >
                    Sua
                  </button>
                  <button
                    onClick={() => {
                      setProducts(products.filter((_, i) => i !== index));
                    }}
                  >
                    Xoa
                  </button>
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
