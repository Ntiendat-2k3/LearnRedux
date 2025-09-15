import ProductList from "../component/ProductList";
import ProductListNoRedux from "../component/ProductListNoRedux";

const App = () => {
  return (
    <div>
      <ProductList />
      <ProductListNoRedux />
    </div>
  );
};

export default App;
