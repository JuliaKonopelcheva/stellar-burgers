import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const fetchProfileOrders = createAsyncThunk(
  'profileOrders/fetchProfileOrders',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
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

export default profileOrdersSlice.reducer;
