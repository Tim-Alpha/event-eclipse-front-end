import { createSlice } from '@reduxjs/toolkit';

const userToken = localStorage.getItem('token');
const userInfo = localStorage.getItem('user');
const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

const initialState = {
  token: userToken || null,
  user: parsedUserInfo,
  isAuthenticated: !!userToken,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
