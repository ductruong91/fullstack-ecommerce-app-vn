import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: {}, // Chủ giỏ hàng
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      console.log("action", action.payload);

      const {
        userId = {},
        _id = "",
        price = 0,
        name = "",
        images = [],
        stock = 0,
        type = "",
      } = action.payload.product;
      const quantity = action.payload.quantity;
      state.userId = action.payload.cartOwnerID;
      state.products.push({
        _id,
        quantity,
        price,
        name,
        images,
        userId,
        stock,
        type,
      });
      console.log("chu gio hang", state.userId);
    },
    removeLastProduct: (state) => {
      state.products.pop(); // Xóa sản phẩm cuối cùng
    },
    // nhận pay load _id của sản phẩm cần xóa
    removeProductFromCart: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product._id !== productId
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProductToCart, removeLastProduct, removeProductFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
