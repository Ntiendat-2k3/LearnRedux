import React, { useState } from "react";
import ui from "../../styles/ui.module.css";
import styles from "./OrderForm.module.css";
import { useAppDispatch } from "../../app/hooks";
import { addOrder } from "../../features/orders/ordersSlice";

const blankItem = () => ({ sku: "", name: "", qty: 1, price: 0 });

export default function OrderForm() {
  const dispatch = useAppDispatch();
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([blankItem()]);

  const addRow = () => setItems((prev) => [...prev, blankItem()]);
  const removeRow = (idx) => setItems((prev) => prev.filter((_, i) => i !== idx));
  const updateItem = (idx, patch) => {
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  };

  const total = items.reduce((s, it) => s + (Number(it.qty) || 0) * (Number(it.price) || 0), 0);

  const submit = async (e) => {
    e.preventDefault();
    if (!customerName.trim()) return alert("Nhập tên khách hàng");
    const valid = items.filter((it) => it.name.trim() && Number(it.qty) > 0);
    if (valid.length === 0) return alert("Thêm ít nhất 1 sản phẩm hợp lệ");
    await dispatch(addOrder({ customerName: customerName.trim(), items: valid }));
    setCustomerName("");
    setItems([blankItem()]);
  };

  return (
    <form onSubmit={submit} className={`${ui.card} ${styles.card}`}>
      <h3 style={{marginTop:0}}>Tạo đơn hàng</h3>

      <div className={styles.footer}>
        <label className={ui.muted}>Khách hàng</label>
        <input
          className={ui.input}
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="VD: Nguyễn Văn A"
        />
      </div>

      <div className={ui.row} style={{marginTop:8}}>
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
      </div>

      <div className={styles.footer}>
        <button className={ui.button} type="button" onClick={addRow}>+ Thêm dòng</button>
      </div>

      <div className={styles.total}>Tổng tạm tính: {total.toLocaleString()}</div>

      <div className={styles.footer}>
        <button className={ui.button} type="submit">Tạo đơn</button>
      </div>
    </form>
  );
}
