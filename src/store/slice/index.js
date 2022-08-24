import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  cartData: [],
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartData: (state, action) => {
      state.cartData.push({...action.payload});
    },
    removeCart: (state, action) => {
      const removeItem = state.cartData.filter((item,index) => index !== action.payload);
      state.cartData = removeItem
    }
  },
});

export const {cartData, removeCart} = cartSlice.actions;
export default cartSlice.reducer;
