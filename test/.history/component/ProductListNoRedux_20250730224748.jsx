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
        <button>{isEdit ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default ProductListNoRedux;
