import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import HttpWrapper from '../network/HttpWrapper';
import {SERVER_URL} from '../network/ServerUrl';

export const getProducts = createAsyncThunk('product/getProducts', async () => {
  try {
    const response = await HttpWrapper.GET(
      SERVER_URL.PRODUCTS.GET_PRODUCTS,
      null,
      {},
    );
    return response;
  } catch (error) {}
});

export const getProductDetails = createAsyncThunk(
  'product/getProductDetails',
  async apiPayload => {
    try {
      const url = new URL(SERVER_URL.PRODUCTS.GET_PRODUCT_DETAILS);
      if (apiPayload != undefined) url.searchParams.append('id', apiPayload);
      const response = await HttpWrapper.GET(url.href, null, {});
      return response;
    } catch (error) {}
  },
);

interface ProductsState {
  getProductsLoading: boolean;
  getProductsSuccess: boolean;
  products: [];
  getproductDetailsLoading: boolean;
  getproductDetailsSuccess: boolean;
  productDetails: object;
}

const initialState = {
  getProductsLoading: false,
  getProductsSuccess: false,
  products: [],
  getproductDetailsLoading: false,
  getproductDetailsSuccess: false,
  productDetails: {},
} satisfies ProductsState as ProductsState;

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.getProductsLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.getProductsLoading = false;
      state.getProductsSuccess = true;
      state.products = action.payload;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {});
    builder.addCase(getProducts.pending, (state, action) => {
      state.getproductDetailsLoading = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.getproductDetailsLoading = false;
      state.getProductsSuccess = true;
      state.productDetails = action.payload;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {});
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;
