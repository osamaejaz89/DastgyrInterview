import {createSlice} from '@reduxjs/toolkit';
import {getApi} from './thunk';
const initialState = {
  value: 0,
  fetching: false,
  cartData: [],
  error: null,
};

export const counterSlice = createSlice({
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

// Action creators are generated for each case reducer function
export const {cartData, removeCart} = counterSlice.actions;
export default counterSlice.reducer;
