import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  userId: "",
  name: "",
  description: "",
  price: 0,
  type: "",
  images: [], // hình ảnh đầu tiên của san pham
  stock: 0,
  address: "",
  condition: "",
  owner: {},
};

export const productSlide = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateProduct: (state, action) => {
      const {
        _id = "",
        name,
        userId = "",
        address = "",
        description = "",
        price = 0,
        type = "",
        images = [], // hình ảnh đầu tiên của san pham
        stock = 0,
        condition = "",
        owner = {},
      } = action.payload;

      console.log("action", action);
      state.name = name;
      state.address = address;
      state.id = _id;
      state.description = description;
      state.price = price;
      state.type = type;
      state.stock = stock;
      state.images = images;
      state.condition = condition;
      state.owner = owner;
      state.userId = userId;
    },
    resetProduct: (state) => {},
  },
});

// Action creators are generated for each case reducer function
export const { updateProduct, resetProduct } = productSlide.actions;

export default productSlide.reducer;
