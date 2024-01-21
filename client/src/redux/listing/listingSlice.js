import { createSlice } from "@reduxjs/toolkit";

const listingSlice = createSlice({
  name: "listings",
  initialState: { allListings: null, error: null, loading: false },
  reducers: {
    getProductStart: (state) => {
      state.loading = true;
    },
    getProductSuccess: (state, action) => {
      state.allListings = action.payload;
      state.error = null;
      state.loading = false;
    },
    getProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateProductStart: (state) => {
      state.loading = true;
    },
    updateProductSuccess: (state, action) => {
      (state.allListings = action.payload),
        (state.loading = false),
        (state.error = false);
    },
    updateProductFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
  },
});
export const actions = listingSlice.actions;

export default listingSlice.reducer;
