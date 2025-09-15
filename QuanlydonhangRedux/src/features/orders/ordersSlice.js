// =============================================================================
// ordersSlice.js
// Redux Toolkit slice cho bài toán quản lý đơn hàng.
// - State được chuẩn hoá: entities (id -> order) + ids (thứ tự hiển thị)
// - Thunks gọi "API giả" (ordersApi) để CRUD vào localStorage
// - Reducers đồng bộ cho bộ lọc (search/status/sort)
// Lưu ý: Redux Toolkit dùng Immer nên có thể "ghi đè" state trực tiếp an toàn.
// =============================================================================

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ordersApi } from "./ordersApi";

// ----------------------------- Initial State ---------------------------------
// Cấu trúc state:
// - entities: Map đơn hàng theo id để truy cập O(1)
// - ids: giữ thứ tự hiển thị (mới nhất ở đầu khi tạo đơn)
// - loading/error: trạng thái tải & lỗi chung cho fetch list
// - filters: điều kiện lọc/tìm/sắp xếp áp dụng phía client (không gọi API)
const initialState = {
  entities: {},
  ids: [],
  loading: false,
  error: null,
  filters: {
    search: "",
    status: "ALL",        // "ALL" | "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
    sortBy: "createdAt",  // "createdAt" | "total"
    sortDir: "desc",      // "asc" | "desc"
  },
};

/* ============================== Thunks ======================================*
 * createAsyncThunk sinh ra 3 action type cho mỗi thunk:
 * - pending: bắt đầu gọi API
 * - fulfilled: thành công => action.payload chứa data trả về
 * - rejected: thất bại   => action.error chứa lỗi
 * Ở dưới, extraReducers sẽ xử lý các trạng thái này.
 * ===========================================================================*/

// Lấy toàn bộ danh sách đơn hàng từ localStorage
export const fetchOrders = createAsyncThunk("orders/fetch", async () => {
  const list = await ordersApi.list(); // Promise<Array<Order>>
  return list;                         // sẽ là action.payload ở fulfilled
});

// Tạo đơn hàng mới
export const addOrder = createAsyncThunk("orders/add", async (draft) => {
  const created = await ordersApi.create(draft); // Promise<Order>
  return created;
});

// Đổi trạng thái của 1 đơn (nhanh ngay trên bảng)
export const changeStatus = createAsyncThunk(
  "orders/changeStatus",
  async ({ id, status }) => {
    const updated = await ordersApi.updateStatus(id, status); // Promise<Order>
    return updated;
  }
);

// Sửa đơn hàng (customerName/items/status) trong modal Edit
export const updateOrder = createAsyncThunk(
  "orders/update",
  async ({ id, patch }) => {
    const updated = await ordersApi.update(id, patch); // Promise<Order>
    return updated;
  }
);

// Xoá đơn hàng theo id
export const deleteOrder = createAsyncThunk("orders/delete", async (id) => {
  await ordersApi.remove(id); // Promise<string> hoặc void (ở đây ta chỉ cần id)
  return id;                  // trả lại id để extraReducers xoá trong state
});

/* =============================== Slice ======================================*
 * - name: prefix cho action type
 * - reducers: các action đồng bộ (sync) sửa filters
 * - extraReducers: xử lý kết quả từ các thunks ở trên
 * ===========================================================================*/
const ordersSlice = createSlice({
  name: "orders",
  initialState,

  // ----------------------------- Reducers sync -------------------------------
  // Chỉ cập nhật filters trong state, không đụng dữ liệu orders.
  reducers: {
    // Cập nhật chuỗi tìm kiếm (search box)
    setSearch(state, action) {
      state.filters.search = action.payload;
    },
    // Đổi filter theo trạng thái (ALL/PENDING/...)
    setStatusFilter(state, action) {
      state.filters.status = action.payload;
    },
    // Đổi config sắp xếp: cặp { sortBy, sortDir }
    setSort(state, action) {
      state.filters.sortBy = action.payload.sortBy;
      state.filters.sortDir = action.payload.sortDir;
    },
  },

  // ---------------------------- Extra Reducers -------------------------------
  // Xử lý kết quả bất đồng bộ từ các thunks
  extraReducers: (builder) => {
    builder
      // --- fetchOrders ---
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;   // bật spinner
        state.error = null;     // reset lỗi cũ
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        // Chuẩn hoá lại toàn bộ list: clear & build entities/ids
        state.entities = {};
        state.ids = [];
        action.payload.forEach((o) => {
          state.entities[o.id] = o; // key: value (đây entities là object)
          state.ids.push(o.id); // giữ thứ tự server/localStorage trả về
        });
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Fetch failed"; // lưu thông điệp lỗi
      })

      // --- addOrder ---
      .addCase(addOrder.fulfilled, (state, action) => {
        const o = action.payload;
        state.entities[o.id] = o;  // thêm map
        state.ids.unshift(o.id);   // mới nhất lên đầu
      })

      // --- changeStatus ---
      .addCase(changeStatus.fulfilled, (state, action) => {
        const o = action.payload;
        // Cập nhật lại bản ghi trong entities (ids không đổi)
        state.entities[o.id] = o;
      })

      // --- updateOrder ---
      .addCase(updateOrder.fulfilled, (state, action) => {
        const o = action.payload;
        // Ghi đè dữ liệu đã sửa (total/updatedAt/... đã tính ở API)
        state.entities[o.id] = o; // không đổi vị trí trong ids
      })

      // --- deleteOrder ---
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const id = action.payload;
        // Xoá khỏi entities và loại id khỏi ids để UI mất dòng đó
        delete state.entities[id];
        state.ids = state.ids.filter((x) => x !== id);
      });
  },
});

// Export các action sync để UI dispatch khi đổi bộ lọc
export const { setSearch, setStatusFilter, setSort } = ordersSlice.actions;

// Export reducer của slice để khai báo vào store
export default ordersSlice.reducer;
