import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "presentersChanged",
  initialState: {
    presentersChanged: false,
  },
  reducers: {
    tableChanged: (state, action) => {
      state.presentersChanged = true;
      localStorage.setItem("presentersChanged", JSON.stringify(action.payload));
    },
    unsetTableChanged: (state, action) => {
      state.presentersChanged = false;
      localStorage.removeItem("presentersChanged");
    },
  },
});

export default slice.reducer;

// Actions
const { tableChanged, unsetTableChanged } = slice.actions;

export const changed = (value) => async (dispatch) => {
  try {
    dispatch(tableChanged(value));
  } catch (e) {
    return console.error(e.message);
  }
};

export const unsetChanged = () => async (dispatch) => {
  try {
    return dispatch(unsetTableChanged());
  } catch (e) {
    return console.error(e.message);
  }
};
