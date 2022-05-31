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
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLogin = true;
      localStorage.setItem("usrttkn", token);
      localStorage.setItem("usrid", user.id);
    },
    setAppLoading: (state, action) => {
      const { condition } = action.payload;

      state.isLoading = condition;
    },
  },
});

export const { userSuccessLogin, setAppLoading } = rootSlice.actions;

export default rootSlice.reducer;
