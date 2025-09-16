/**
 * StatsBar: hiển thị số liệu tổng quan từ selector
 * - total, active, completed, overdue
 */
import React from "react";
import { useSelector } from "react-redux";
import { selectCounts } from "../features/selectors";

export default function StatsBar(){
  const c = useSelector(selectCounts);
  return (
    <div className="stats">
      <span>Tổng: {c.total}</span>
      <span>Đang làm: {c.active}</span>
      <span>Hoàn tất: {c.completed}</span>
      <span>Quá hạn: {c.overdue}</span>
    </div>
  );
}
