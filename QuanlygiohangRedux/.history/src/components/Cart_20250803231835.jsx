// src/components/Cart.js
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectTotalPrice } from "../features/cart/selectors";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../features/cart/cartSlice";

export default function Cart() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>🛒 Giỏ hàng</h2>
      {items.length === 0 && <p>Chưa có sản phẩm nào.</p>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}₫ x {item.quantity}
            <button
              onClick={() =>
                dispatch(
                  updateQuantity({ id: item.id, quantity: item.quantity + 1 })
                )
              }
            >
              +
            </button>
            <button
              onClick={() =>
                dispatch(
                  updateQuantity({ id: item.id, quantity: item.quantity - 1 })
                )
              }
            >
              -
            </button>
            <button onClick={() => dispatch(removeFromCart(item.id))}>
              Xóa
            </button>
          </li>
        ))}
      </ul>
      <p>
        <strong>Tổng cộng:</strong> {total}₫
      </p>
      {items.length > 0 && (
        <button onClick={() => dispatch(clearCart())}>Xóa toàn bộ</button>
      )}
    </div>
  );
}
