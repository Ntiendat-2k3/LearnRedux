import React from "react";
import ui from "../../styles/ui.module.css";
import styles from "./OrderFilters.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSearch, setStatusFilter, setSort } from "../../features/orders/ordersSlice";
import { selectFilters } from "../../features/orders/ordersSelectors";

export default function OrderFilters() {
  const dispatch = useAppDispatch();
  const f = useAppSelector(selectFilters);

  return (
    <div className={styles.grid}>
      <input
        className={ui.input}
        placeholder="Tìm theo khách hàng/SKU/Tên SP..."
        value={f.search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />

      <select
        className={ui.select}
        value={f.status}
        onChange={(e) => dispatch(setStatusFilter(e.target.value))}
      >
        <option value="ALL">Tất cả trạng thái</option>
        <option value="PENDING">PENDING</option>
        <option value="PROCESSING">PROCESSING</option>
        <option value="SHIPPED">SHIPPED</option>
        <option value="DELIVERED">DELIVERED</option>
        <option value="CANCELLED">CANCELLED</option>
      </select>

      <select
        className={ui.select}
        value={f.sortBy}
        onChange={(e) => dispatch(setSort({ sortBy: e.target.value, sortDir: f.sortDir }))}
      >
        <option value="createdAt">Sắp xếp theo ngày tạo</option>
        <option value="total">Sắp xếp theo tổng tiền</option>
      </select>

      <select
        className={ui.select}
        value={f.sortDir}
        onChange={(e) => dispatch(setSort({ sortBy: f.sortBy, sortDir: e.target.value }))}
      >
        <option value="desc">Giảm dần</option>
        <option value="asc">Tăng dần</option>
      </select>
    </div>
  );
}
