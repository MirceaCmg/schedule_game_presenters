import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "ui",
  initialState: {
    presentersChanged: false,
    tableChanged: false,
  },
  reducers: {
    presentersChanged: (state, action) => {
      state.presentersChanged = true;
      localStorage.setItem("presentersChanged", JSON.stringify(action.payload));
    },
    tablesChanged: (state, action) => {
      state.tableChanged = true;
      localStorage.setItem("tableChanged", JSON.stringify(action.payload));
    },
    unsetPresentersChanged: (state, action) => {
      state.presentersChanged = false;
      localStorage.removeItem("presentersChanged");
    },
    unsetTableChanged: (state, action) => {
      state.tableChanged = false;
      localStorage.removeItem("tableChanged");
    },
  },
});

export default slice.reducer;

// Actions
const {
  tablesChanged,
  presentersChanged,
  unsetPresentersChanged,
  unsetTableChanged,
} = slice.actions;

export const tbChanged = (value) => async (dispatch) => {
  try {
    dispatch(tablesChanged(value));
  } catch (e) {
    return console.error(e.message);
  }
};
export const presenterChanged = (value) => async (dispatch) => {
  try {
    dispatch(presentersChanged(value));
  } catch (e) {
    return console.error(e.message);
  }
};

export const unsetTbChanged = () => async (dispatch) => {
  try {
    return dispatch(unsetTableChanged());
  } catch (e) {
    return console.error(e.message);
  }
};

export const unsetPresenterChanged = () => async (dispatch) => {
  try {
    return dispatch(unsetPresentersChanged());
  } catch (e) {
    return console.error(e.message);
  }
};
