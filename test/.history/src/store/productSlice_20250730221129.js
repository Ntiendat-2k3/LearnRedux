import { createSlice } from "@reduxjs/toolkit";

const initialProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 29990000,
    category: "Điện thoại",
    description: "iPhone 15 Pro với chip A17 Pro mạnh mẽ",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 22990000,
    category: "Điện thoại",
    description: "Samsung Galaxy S24 với AI tích hợp",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "MacBook Air M3",
    price: 34990000,
    category: "Laptop",
    description: "MacBook Air với chip M3 siêu mỏng nhẹ",
    image: "/placeholder.svg?height=200&width=200",
  },
];

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: initialProducts,
    isOpenModal: false,
    isEditProduct: false,
  },
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        id: new Date().getTime(),
        ...action.payload,
      };
      state.items.push(newProduct);
    },
    updateProduct: (state, action) => {
      console.log("🚀 ~ action:", action.payload);
      // const { id } = action.payload;
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      const { id: idDeleted } = action.payload;
      const filter = state.items.filter((item) => item.id !== idDeleted);
      state.items = filter;
    },
  },
});

export default productSlice.reducer;
export const { addProduct, deleteProduct, updateProduct } =
  productSlice.actions;
