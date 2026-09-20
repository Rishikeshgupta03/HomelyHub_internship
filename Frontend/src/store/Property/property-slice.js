// state manager
// all list properties
// count
// search filters
// loading flags
// error

import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
  name: "property",
  initialState: {
    properties: [],
    totalProperties: 0,
    searchParams: {},
    error: null,
    loading: false,
  },
  reducers: {
    getRequest(state) {
      state.loading = true;
    },
    getAllProperties(state, action) {
      state.properties = action.payload?.data || action.payload || [];
      state.totalProperties = action.payload?.all_properties || action.payload?.totalProperties || 0;
      state.loading = false;
    },
    updateSearchParams: (state, action) => {
      state.searchParams = Object.keys(action.payload).length === 0 
        ? {} 
        : {
            ...state.searchParams,
            ...action.payload,
          };
    },
    getErrors(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const propertyAction = propertySlice.actions;
export default propertySlice;
