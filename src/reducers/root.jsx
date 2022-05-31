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
      if (user && token) {
        state.user = user;
        state.token = token;
        state.isLogin = true;
        localStorage.setItem("usrttkn", token);
        localStorage.setItem("usrid", user.id);
      }
    },
    setAppLoading: (state, action) => {
      const { condition } = action.payload;

      state.isLoading = condition;
    },
    userLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isLogin = false;
      localStorage.removeItem("usrttkn");
      localStorage.removeItem("usrid");
    },
  },
});

export const { userSuccessLogin, setAppLoading, userLogout } =
  rootSlice.actions;

export default rootSlice.reducer;
