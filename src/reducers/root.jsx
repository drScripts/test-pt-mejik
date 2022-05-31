import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isLogin: false,
  isLoading: false,
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    userSuccessLogin: (state, action) => {
      const { user, token } = action;

      state = {
        user,
        token,
        isLogin: true,
      };
    },
    setAppLoading: (state, action) => {
      const { condition } = action;

      state.isLoading = condition;
    },
  },
});

export const { userSuccessLogin, setAppLoading } = rootSlice.actions;

export default rootSlice.reducer;
