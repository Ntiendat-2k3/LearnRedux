import ProductManager from "./components/ProductManager";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="App">
      <h1>🛒 Shop với Redux</h1>
      <ProductManager />
      <hr />
      <Cart />
    </div>
  );
}

export default App;
