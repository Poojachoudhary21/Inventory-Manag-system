// Description: This file contains the Redux slice for managing inventory data.
// It includes actions for fetching inventory data from an API and handling loading and error states.
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchInventory = createAsyncThunk('inventory/fetchInventory', async () => {
  const url = '/api/dummy/inventory';
  const res = await axios.get(url);
//   console.log(res.data);
  return res.data;
});

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default inventorySlice.reducer;
