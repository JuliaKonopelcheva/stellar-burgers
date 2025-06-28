import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';
import { RootState } from '../store';

export const fetchProfileOrders = createAsyncThunk(
  'profileOrders/fetchProfileOrders',
  getOrdersApi
);

interface IProfileOrdersState {
  orders: TOrder[];
  loading: boolean;
  error: boolean;
}

const initialState: IProfileOrdersState = {
  orders: [],
  loading: false,
  error: false
};

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileOrders.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchProfileOrders.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  }
});

// Селекторы
export const selectProfileOrders = (state: RootState) =>
  state.profileOrders.orders;
export const selectProfileOrdersLoading = (state: RootState) =>
  state.profileOrders.loading;
export const selectProfileOrdersError = (state: RootState) =>
  state.profileOrders.error;

export default profileOrdersSlice.reducer;
