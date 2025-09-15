import React, { useEffect, useState } from "react";
import ui from "../../styles/ui.module.css";
import styles from "./OrderList.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeStatus, deleteOrder, fetchOrders } from "../../features/orders/ordersSlice";
import { selectFilteredSorted, selectLoading, selectError } from "../../features/orders/ordersSelectors";
import OrderEditModal from "./OrderEditModal";

const statusOptions = ["PENDING","PROCESSING","SHIPPED","DELIVERED","CANCELLED"];

export default function OrderList() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const orders = useAppSelector(selectFilteredSorted);
  const [editing, setEditing] = useState(null);

  useEffect(() => { dispatch(fetchOrders()); }, [dispatch]);

  return (
    <div className={ui.card}>
      <h3 style={{marginTop:0}}>Danh sách đơn hàng</h3>

      {loading && <p className={ui.muted}>Đang tải…</p>}
      {error && <p style={{color:"#ff8080"}}>{error}</p>}
      {!loading && orders.length === 0 && <p className={ui.muted}>Chưa có đơn hàng</p>}

      {orders.length > 0 && (
        <div className={styles.tableWrap}>
          <table className={ui.table}>
            <thead className={ui.thead}>
              <tr>
                <th className={ui.th} align="left">Mã</th>
                <th className={ui.th} align="left">Khách hàng</th>
                <th className={ui.th} align="left">Sản phẩm</th>
                <th className={`${ui.th} ${ui.tdRight}`}>Tổng</th>
                <th className={ui.th} align="left">Trạng thái</th>
                <th className={ui.th} align="left">Ngày tạo</th>
                <th className={ui.th} align="left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className={ui.td}>{o.id.slice(0,6)}</td>
                  <td className={ui.td}>{o.customerName}</td>
                  <td className={ui.td}>
                    {o.items.map((it, i) => (
                      <div key={i} className={ui.muted}>{it.name} x{it.qty}</div>
                    ))}
                  </td>
                  <td className={`${ui.td} ${ui.tdRight}`}>{o.total.toLocaleString()}</td>
                  <td className={ui.td}>
                    <select className={ui.select}
                      value={o.status}
                      onChange={(e) => dispatch(changeStatus({ id: o.id, status: e.target.value }))}
                    >
                      {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className={ui.td}>{new Date(o.createdAt).toLocaleString()}</td>
                  <td className={ui.td}>
                    <div className={styles.actions}>
                      <button className={ui.button} onClick={() => setEditing(o)}>Sửa</button>
                      <button className={`${ui.button} ${ui.buttonDanger}`} onClick={() => dispatch(deleteOrder(o.id))}>Xoá</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <OrderEditModal order={editing} onClose={() => setEditing(null)} />
      )}
    </div>
  );
}
