- entities là một object đóng vai trò “bảng tra cứu” (dictionary / map), nơi mỗi key là id của đơn hàng và value là chính đối tượng đơn hàng đó.
Hiểu nhanh: entities[id] → order

- state.entities[o.id] = o; là gán/ghi một phần tử trong object entities với key là o.id và value là chính đối tượng đơn hàng o.
- Hiểu đúng ngữ cảnh
 - state.entities được thiết kế như bảng băm (dictionary): { [orderId]: orderObject }.
 - Dòng này:
   + Nếu key chưa tồn tại ⇒ tạo mới mục { [o.id]: o }.
   + Nếu key đã tồn tại ⇒ ghi đè (cập nhật) mục đó bằng dữ liệu mới o.

```js
state = {
  entities: {
    "A1": { id: "A1", customerName: "Nam", total: 120000, status: "PENDING", ... },
    "B2": { id: "B2", customerName: "Lan", total: 350000, status: "SHIPPED", ... },
    // ...
  },
  ids: ["B2", "A1", ...], // mảng chỉ giữ thứ tự hiển thị
  // ...
}
```
