import React, { useEffect, useState } from "react";
import ui from "../../styles/ui.module.css";
import styles from "./OrderEditModal.module.css";
import { useAppDispatch } from "../../app/hooks";
import { updateOrder } from "../../features/orders/ordersSlice";

const statusOptions = ["PENDING","PROCESSING","SHIPPED","DELIVERED","CANCELLED"];
const blankItem = () => ({ sku: "", name: "", qty: 1, price: 0 });

export default function OrderEditModal({ order, onClose }) {
  const dispatch = useAppDispatch();
  const [customerName, setCustomerName] = useState(order?.customerName || "");
  const [status, setStatus] = useState(order?.status || "PENDING");
  const [items, setItems] = useState(order?.items?.length ? order.items : [blankItem()]);

  useEffect(() => {
    setCustomerName(order?.customerName || "");
    setStatus(order?.status || "PENDING");
    setItems(order?.items?.length ? order.items : [blankItem()]);
  }, [order]);

  const addRow = () => setItems((prev) => [...prev, blankItem()]);
  const removeRow = (idx) => setItems((prev) => prev.filter((_, i) => i !== idx));
  const updateItem = (idx, patch) =>
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, ...patch } : it)));

  const total = items.reduce((s, it) => s + (Number(it.qty) || 0) * (Number(it.price) || 0), 0);

  const save = async () => {
    if (!customerName.trim()) return alert("Nhập tên khách hàng");
    const valid = items.filter((it) => (it.name || "").trim() && Number(it.qty) > 0);
    if (valid.length === 0) return alert("Thêm ít nhất 1 sản phẩm hợp lệ");
    await dispatch(updateOrder({ id: order.id, patch: { customerName: customerName.trim(), items: valid, status } }));
    onClose?.();
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 style={{margin:0}}>Sửa đơn: {order.id.slice(0,6)}</h3>
          <button className={`${ui.button} ${ui.buttonGhost}`} onClick={onClose}>✕</button>
        </div>

        <div style={{marginTop:12}}>
          <label className={ui.muted}>Khách hàng</label>
          <input className={ui.input} value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        </div>

        <div style={{marginTop:12}}>
          <label className={ui.muted}>Trạng thái</label>
          <select className={ui.select} value={status} onChange={(e) => setStatus(e.target.value)}>
            {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div style={{marginTop:12}}>
          <div style={{fontWeight:600, marginBottom:6}}>Sản phẩm</div>
          {items.map((it, idx) => (
            <div key={idx} className={styles.itemsRow}>
              <input className={ui.input} placeholder="SKU"
                value={it.sku} onChange={(e) => updateItem(idx, { sku: e.target.value })}/>
              <input className={ui.input} placeholder="Tên sản phẩm"
                value={it.name} onChange={(e) => updateItem(idx, { name: e.target.value })}/>
              <input className={ui.input} type="number" placeholder="SL"
                value={it.qty} onChange={(e) => updateItem(idx, { qty: Number(e.target.value) })}/>
              <input className={ui.input} type="number" placeholder="Đơn giá"
                value={it.price} onChange={(e) => updateItem(idx, { price: Number(e.target.value) })}/>
              <button className={`${ui.button} ${ui.buttonGhost}`} type="button" onClick={() => removeRow(idx)}>Xoá</button>
            </div>
          ))}
          <div style={{marginTop:8}}>
            <button className={ui.button} type="button" onClick={addRow}>+ Thêm dòng</button>
          </div>
        </div>

        <div style={{marginTop:12, fontWeight:600}}>Tổng mới: {total.toLocaleString()}</div>

        <div className={styles.footer}>
          <button className={`${ui.button} ${ui.buttonGhost}`} onClick={onClose}>Huỷ</button>
          <button className={ui.button} onClick={save}>Lưu</button>
        </div>
      </div>
    </div>
  );
}
