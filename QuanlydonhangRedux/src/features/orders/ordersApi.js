/* ============================================================================
  ordersApi.js
  API giả lập CRUD đơn hàng sử dụng localStorage.
  Ý tưởng: coi localStorage như "database" phía client để demo luồng Redux.
  - Đọc/ghi toàn bộ danh sách orders bằng key STORAGE_KEY
  - Mỗi hàm đều trả về Promise (có delay) để giống gọi API thực tế.
============================================================================ */

/** Key dùng để lưu trữ dữ liệu trong localStorage */
const STORAGE_KEY = "orders_demo_js";

/**
 * Trả về thời điểm hiện tại dạng ISO (VD: "2025-09-10T00:00:00.000Z")
 * Dùng cho createdAt / updatedAt
 */
const nowISO = () => new Date().toISOString();

/**
 * Tính tổng tiền đơn hàng từ danh sách items
 * Mỗi item có qty (số lượng) * price (đơn giá)
 * Ép kiểu Number và fallback 0 để tránh NaN khi input rỗng
 * @param {Array<{qty: number, price: number}>} items
 * @returns {number}
 */
const calcTotal = (items) =>
  items.reduce((s, it) => s + (Number(it.qty) || 0) * (Number(it.price) || 0), 0);

/**
 * Đọc dữ liệu từ localStorage
 * - Nếu chưa có dữ liệu => trả về mảng rỗng
 * - Nếu JSON lỗi => an toàn trả về mảng rỗng
 * @returns {Array<Object>}
 */
function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Ghi toàn bộ danh sách orders vào localStorage
 * @param {Array<Object>} data
 */
function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Tạo id "gần như" duy nhất dựa trên random + timestamp (base36)
 * @returns {string}
 */
function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

/**
 * Tạo Promise resolve sau ms mili-giây — giả lập độ trễ mạng/API
 * @param {number} ms
 * @returns {Promise<void>}
 */
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/* ============================================================================
  ordersApi: Cung cấp các hàm CRUD (list, create, updateStatus, update, remove)
  Tất cả đều async/await để mô phỏng gọi API thật.
============================================================================ */
export const ordersApi = {
  /**
   * Lấy danh sách toàn bộ orders từ "database" (localStorage)
   * @returns {Promise<Array<Object>>}
   */
  async list() {
    await delay(200);       // giả lập độ trễ
    return load();          // đọc và trả về mảng orders
  },

  /**
   * Tạo một đơn hàng mới từ draft
   * - Tự gán id, createdAt, updatedAt
   * - Tự tính total từ items
   * - Mặc định status = "PENDING" nếu không truyền
   * @param {{customerName?: string, items?: Array<Object>, status?: string}} draft
   * @returns {Promise<Object>} order vừa tạo
   */
  async create(draft) {
    await delay(200);
    const orders = load();
    console.log(orders)  // mảng các phần tử là object

    // Lưu ý: luôn .trim() customerName để sạch dữ liệu
    const order = {
      id: genId(),
      customerName: (draft.customerName || "").trim(),
      items: draft.items || [],
      total: calcTotal(draft.items || []),
      status: draft.status || "PENDING",
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };

    // Đưa đơn mới lên đầu danh sách cho dễ thấy
    orders.unshift(order);
    save(orders);           // ghi lại toàn bộ danh sách
    return order;
  },

  /**
   * Cập nhật nhanh TRẠNG THÁI đơn hàng (không đụng items)
   * - Nếu không tìm thấy id => throw Error
   * - Cập nhật updatedAt
   * @param {string} id
   * @param {"PENDING"|"PROCESSING"|"SHIPPED"|"DELIVERED"|"CANCELLED"} status
   * @returns {Promise<Object>} order sau khi cập nhật
   */
  async updateStatus(id, status) {
    await delay(150);
    const orders = load();

    // Tìm vị trí order theo id
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) throw new Error("Order not found");
    console.log(orders[idx])

    // Tạo bản ghi mới với status mới và updatedAt mới
    orders[idx] = { ...orders[idx], status, updatedAt: nowISO() };

    save(orders);
    return orders[idx];
  },

  /**
   * SỬA đơn hàng (Edit)
   * - patch có thể chứa: customerName?, items?, status?
   * - Tự động tính lại total theo items mới (nếu có)
   * - Luôn cập nhật updatedAt
   * - Không tìm thấy id => throw Error
   * @param {string} id
   * @param {{customerName?: string, items?: Array<Object>, status?: string}} patch
   * @returns {Promise<Object>} order sau khi sửa
   */
  async update(id, patch) {
    // patch: { customerName?, items?, status? }
    await delay(200);
    const orders = load();

    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) throw new Error("Order not found");

    const old = orders[idx];

    // Nếu patch có items thì dùng items mới; nếu không, giữ nguyên items cũ
    const nextItems = patch.items ? patch.items : old.items;

    // Gộp dữ liệu cũ và mới:
    // - customerName: trim để tránh khoảng trắng thừa
    // - items/total: luôn đồng bộ
    const next = {
      ...old,
      ...patch,
      customerName: (patch.customerName ?? old.customerName).trim(),
      items: nextItems,
      total: calcTotal(nextItems),
      updatedAt: nowISO(),
    };

    orders[idx] = next;
    save(orders);
    return next;
  },

  /**
   * XÓA một đơn hàng theo id
   * - Lọc bỏ order có id tương ứng
   * - Trả về chính id đã xóa để reducer sử dụng
   * @param {string} id
   * @returns {Promise<string>}
   */
  async remove(id) {
    await delay(150);
    const next = load().filter((o) => o.id !== id);
    save(next);
    return id;
  },
};
