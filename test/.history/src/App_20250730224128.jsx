import ProductList from "../component/ProductList";

const App = () => {
  return (
    <div>
      <ProductList />
      <ProductListNoRedux />
    </div>
  );
};

export default App;
