import { createSlice } from "@reduxjs/toolkit";

const myListingSlice = createSlice({
  name: "myListing",
  initialState: { myListings: null, isError: null, isLoading: false },
  reducers: {
    getMyListingStart: (state) => {
      state.isLoading = true;
    },
    getMyListingSuccess: (state, action) => {
      state.myListings = action.payload;
      state.isError = null;
      state.isLoading = false;
    },
    getMyListingFailure: (state, action) => {
      (state.isError = action.payload), (state.isLoading = null);
    },
  },
});
export const myListingActions = myListingSlice.actions;

export default myListingSlice.reducer;
