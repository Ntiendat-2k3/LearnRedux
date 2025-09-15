import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);

  return (
    <div>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <br />
        <label>
          price:
          <input type="number" name="price" />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description"></textarea>
        </label>
        <br />
        <label>
          Category:
          <select name="category">
            <option value="books">Books</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="toys">Toys</option>
            <option value="sports">Sports</option>
            <option value="beauty">Beauty</option>
            <option value="automotive">Automotive</option>
            <option value="food">Food</option>
          </select>
        </label>
        <br />
        <button>Add</button>
      </form>
    </div>
  );
};

export default App;
