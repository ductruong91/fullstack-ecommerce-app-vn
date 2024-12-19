import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slides/counterSlide";
import userReducer from "./slides/userSlide";
import filterReducer from "./slides/filterSlide";
import orderReducer from "./slides/orderSlide";
import cartReducer from "./slides/cartSlide";
import productReducer from "./slides/productSlide";

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    filter: filterReducer,
    order: orderReducer,
    cart: cartReducer,
    product: productReducer,
  },
});
