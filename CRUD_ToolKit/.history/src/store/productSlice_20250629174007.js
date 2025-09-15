import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        id: new Date().getTime(),
        ...action.payload,
      };
      state.products.push(newProduct);
    },
  },
});

export default productSlice;

export const { addProduct } = productSlice.actions;
