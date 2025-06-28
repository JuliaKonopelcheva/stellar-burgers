import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';
import { RootState } from '../store';

export const fetchFeedOrders = createAsyncThunk(
  'feed/fetchFeedOrders',
  getFeedsApi
);

interface IFeedState {
  orders: TOrder[];
  loading: boolean;
  error: boolean;
  total: number;
  totalToday: number;
}

const initialState: IFeedState = {
  orders: [],
  loading: false,
  error: false,
  total: 0,
  totalToday: 0
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedOrders.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchFeedOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeedOrders.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  }
});

// Селекторы
export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeedLoading = (state: RootState) => state.feed.loading;
export const selectFeedError = (state: RootState) => state.feed.error;
export const selectFeedTotal = (state: RootState) => state.feed.total;
export const selectFeedTotalToday = (state: RootState) => state.feed.totalToday;

export default feedSlice.reducer;
