import {createSlice} from '@reduxjs/toolkit';

interface CartState {
  cartProducts: [];
}

const initialState = {
  cartProducts: [],
} satisfies CartState as CartState;

const cartSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.cartProducts = [...state.cartProducts, ...action.payload];
    },
    deleteProduct: (state, action) => {},
  },
});

export const {addProduct, deleteProduct} = cartSlice.actions;
export default cartSlice.reducer;
