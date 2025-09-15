import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {},
});

export default productSlice;

export const { addProduct } = productSlice.actions;
