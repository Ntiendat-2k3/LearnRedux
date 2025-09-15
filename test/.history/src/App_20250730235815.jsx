// import ProductList from "../component/ProductList";
import ProductListNoRedux from "../component/ProductListNoRedux";
import TodoListNoRedux from "../component/TodoListNoRedux";

const App = () => {
  return (
    <div>
      {/* <ProductList /> */}
      <ProductListNoRedux />
      <TodoListNoRedux />
    </div>
  );
};

export default App;
