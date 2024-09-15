import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice';
import cartReeducer from '../features/cart/cartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReeducer,
  },
});

export default store;
