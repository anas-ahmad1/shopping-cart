import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    getItems: (state, action) => {
      console.log("In cart reducer")
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    deletefromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
});

export const { getItems, addToCart, deletefromCart } = cartSlice.actions;
export default cartSlice.reducer;
