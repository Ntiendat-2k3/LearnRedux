const productReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [...state, action.payload];
    case "REMOVE_PRODUCT":
      return state.filter((product) => product.id !== action.payload.id);
    case "UPDATE_PRODUCT":
      return state.map((product) =>
        product.id === action.payload.id
          ? { ...product, ...action.payload }
          : product
      );
    default:
      return state;
  }
};
export default productReducer;
