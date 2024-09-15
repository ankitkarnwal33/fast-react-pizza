import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const isAlreadyInList = state.cart.filter(
        (item) => item.pizzaId === action.payload.pizzaId,
      );
      if (isAlreadyInList.length > 0) {
        //Item already exist in the cart array
        return;
      }
      state.cart.push(action.payload);
    },
    deleteCartItem(state, action) {
      if (state.cart.length === 1) state.cart.pop();
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }
      if (item.quantity === 0)
        cartSlice.caseReducers.deleteCartItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});
export const getCart = (state) => state.cart.cart;
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => (sum = sum + item.totalPrice), 0);

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => (sum = sum + item.quantity), 0);

export const getTotalCartQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity;
export const {
  addItem,
  deleteCartItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
