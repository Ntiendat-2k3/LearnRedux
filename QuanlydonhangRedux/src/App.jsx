import ui from "./styles/ui.module.css";
import OrderFilters from "./components/orders/OrderFilters";
import OrderForm from "./components/orders/OrderForm";
import OrderList from "./components/orders/OrderList";

export default function App() {
  return (
    <div className={ui.wrapper}>
      <div className={ui.container}>
        <h2 className={ui.h2}>Quản lý đơn hàng (Redux Toolkit)</h2>
        <OrderFilters />
        <OrderForm />
        <OrderList />
      </div>
    </div>
  );
}
