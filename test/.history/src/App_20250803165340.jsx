// import ProductList from "../component/ProductList";
import ProductListNoRedux from "../component/ProductListNoRedux";
import Test from "../component/test";
import TodoListNoRedux from "../component/TodoListNoRedux";

const App = () => {
  return (
    <div>
      {/* <ProductList /> */}
      <ProductListNoRedux />
      <TodoListNoRedux />
      <Test />
    </div>
  );
};

export default App;
