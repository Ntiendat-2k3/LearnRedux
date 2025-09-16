/**
 * Component Layout tổng thể: sidebar | content (toolbar, main, footer)
 * Mục tiêu: tách bố cục khỏi logic để dễ thay đổi UI.
 */
import React from "react";

export default function Layout({ sidebar, toolbar, main, footer }) {
  return (
    <div className="app-root">
      <aside className="sidebar">{sidebar}</aside>
      <section className="content">
        <div className="toolbar">{toolbar}</div>
        <div className="main">{main}</div>
        <div className="footer">{footer}</div>
      </section>
    </div>
  );
}
