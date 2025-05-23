/// redux for all the like api/filtering/sorting
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  filter: "",
  sortKey: "",
  sortOrder: "asc",
  page: 1,
  itemsPerPage: 10,
};

// Async thunk to fetch data
export const fetchTableData = createAsyncThunk(
  "table/fetchData",
  async (_, thunkAPI) => {
    try {
      const url = '/api/dummy/inventory';
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch table data");
    }
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortKey: (state, action) => {
      state.sortKey = action.payload;
    },
    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchTableData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilter, setSortKey, toggleSortOrder, setPage } = tableSlice.actions;
export default tableSlice.reducer;
