# React + Redux Toolkit — Todo App (Bản có chú thích tiếng Việt)

Ứng dụng To‑Do nâng cao viết bằng **React + Redux Toolkit** (JS) với các tính năng:
- CRUD đầy đủ (thêm/sửa/xoá/đánh dấu hoàn tất)
- Dự án (Projects) cơ bản: *Inbox* & *Today* + thêm dự án mới
- Lọc theo trạng thái, tag, ưu tiên, due date; tìm kiếm; sắp xếp
- Thẻ (tags), ưu tiên (1–3), hạn chót (due date)
- Subtasks (công việc con)
- Kéo‑thả để **reorder** trong cùng Project
- Bulk actions (Complete all visible, Clear completed)
- **Undo/Redo** (tự viết reducer HOC nhỏ)
- **localStorage** persistence + **Import/Export** JSON

## Cách chạy nhanh (Vite)
```bash
npm create vite@latest redux-todo-advanced -- --template react
cd redux-todo-advanced
npm i @reduxjs/toolkit react-redux date-fns lucide-react
# Sao chép thư mục src/ trong ZIP này đè lên src/ của dự án Vite
npm run dev
```

> Mọi file trong `src/` đã được **chú thích tiếng Việt** rất chi tiết để bạn đọc/hiểu nhanh.
