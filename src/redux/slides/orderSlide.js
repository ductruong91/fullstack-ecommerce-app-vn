import { SetMealOutlined } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buyerId: {}, // Người mua
  sellerId: {}, // Người bán
  products: [],
  totalAmount: 0,
  status: {},
  shippingAddress: {
    address: "",
    name: "",
    phone: 0,
  },
  paymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {},
    resetOrder: (state) => {},
  },
});

// Action creators are generated for each case reducer function
export const { addOrderProduct, resetUser } = orderSlice.actions;

export default orderSlice.reducer;
