import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "tables",
  initialState: {
    tables: [],
  },
  reducers: {
    tables: (state, action) => {
      state.presenters = action.payload;
    },
  },
});

export default slice.reducer;

// Actions
const { tables } = slice.actions;

export const getTables = (value) => async (dispatch) => {
  try {
    dispatch(tables(value));
  } catch (e) {
    return console.error(e.message);
  }
};
