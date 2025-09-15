import { createSelector } from "@reduxjs/toolkit";

export const selectCartItems = (state) => state.cart.items;

export const selectTotalPrice = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)
);
