import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  type: "",
  message: "",
};
const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: initialState,
  reducers: {
    showSnackBar(state, action) {
      state.status = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.status = false;
    },
  },
});

export const snackbarActions = snackbarSlice.actions;

export default snackbarSlice.reducer;
