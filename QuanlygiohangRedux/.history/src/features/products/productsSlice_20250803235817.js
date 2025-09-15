// src/features/products/productsSlice.js
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  products: [
    { id: "p1", name: "Laptop", price: 1500 },
    { id: "p2", name: "Phone", price: 800 },
  ],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: {
      reducer(state, action) {
        state.products.push(action.payload);
      },
      prepare(product) {
        return { payload: { ...product, id: nanoid() } };
      },
    },
    updateProduct(state, action) {
      const { id, name, price } = action.payload;
      const prod = state.products.find((p) => p.id === id);
      if (prod) {
        prod.name = name;
        prod.price = price;
      }
    },
    deleteProduct(state, action) {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
