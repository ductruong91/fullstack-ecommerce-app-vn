import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slides/counterSlide'
import userReducer from './slides/userSilde'
import filterReducer from "./slides/filterSlide";

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    filter: filterReducer,
  },
});
