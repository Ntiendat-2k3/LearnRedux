import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        id: state.products.length + 1,
        ...action.payload,
      };
      state.products.push(action.payload);
    },
  },
});

export default productSlice;

export const { addProduct } = productSlice.actions;
