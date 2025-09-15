import { useState } from "react";

const ProductListNoRedux = () => {
  const [products, setProducts] = useState([]);

  const handelChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <div>
      <form action="">
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
      </form>
    </div>
  );
};

export default ProductListNoRedux;
