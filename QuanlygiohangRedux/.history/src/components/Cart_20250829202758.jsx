import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectTotalPrice } from "../features/cart/selectors";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../features/cart/cartSlice";
import styles from "./Cart.module.css";

export default function Cart() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🛒 Giỏ hàng</h2>
      {items.length === 0 && (
        <p className={styles.emptyMessage}>Chưa có sản phẩm nào.</p>
      )}
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.item}>
            <div className={styles.itemInfo}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemPrice}>{item.price}₫</span>
            </div>
            <div className={styles.quantityControls}>
              <button
                className={`${styles.button} ${styles.quantityButton}`}
                onClick={() =>
                  dispatch(
                    updateQuantity({ id: item.id, quantity: item.quantity - 1 })
                  )
                }
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className={styles.quantity}>{item.quantity}</span>
              <button
                className={`${styles.button} ${styles.quantityButton}`}
                onClick={() =>
                  dispatch(
                    updateQuantity({ id: item.id, quantity: item.quantity + 1 })
                  )
                }
              >
                +
              </button>
            </div>
            <button
              className={`${styles.button} ${styles.removeButton}`}
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <p className={styles.total}>
          <strong>Tổng cộng:</strong> {total.toLocaleString("vi-VN")}₫
        </p>
        {items.length > 0 && (
          <button
            className={`${styles.button} ${styles.clearButton}`}
            onClick={() => dispatch(clearCart())}
          >
            Xóa toàn bộ
          </button>
        )}
      </div>
    </div>
  );
}
