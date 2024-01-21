import { createSlice } from "@reduxjs/toolkit";

const myListingSlice = createSlice({
  name: "myListing",
  initialState: { myListings: null, error: null, loading: false },
  reducers: {
    getMyListingStart: (state) => {
      state.loading = true;
    },
    getMyListingSuccess: (state, action) => {
      state.myListings = action.payload;
      state.error = null;
      state.loading = false;
    },
    getMyListingFailure: (state, action) => {
      (state.error = action.payload), (state.loading = null);
    },
  },
});
export const myListingActions = myListingSlice.actions;

export default myListingSlice.reducer;
