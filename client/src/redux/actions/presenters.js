import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "presenters",
  initialState: {
    presenters: [],
  },
  reducers: {
    presenters: (state, action) => {
      state.presenters = action.payload;
    },
  },
});

export default slice.reducer;

// Actions
const { presenters } = slice.actions;

export const getPresenters = (value) => async (dispatch) => {
  try {
    dispatch(presenters(value));
  } catch (e) {
    return console.error(e.message);
  }
};
