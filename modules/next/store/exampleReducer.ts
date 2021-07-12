import { createSlice } from "@reduxjs/toolkit";

const sliceName = "sliceName";
const testSlice = createSlice({
  //slice name
  name: sliceName,
  initialState: {
    test: "",
  },
  //
  reducers: {
    setTest(state, { payload }) {
      state.test = payload;
    },
    clearTest(state) {
      state.test = null;
    },
  },
});

export const fooSelector = (state) => state[sliceName].test;

export const { setTest, clearTest } = testSlice.actions;
export const fetchData = (foo) => async (dispatch) => {
  dispatch(setTest(foo));
};

export default testSlice.reducer;
