import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  //userIds: "65f9a2109ed8ea7fee2bfe00",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// export const globalSlice = createSlice({
//   name: "global",
//   initialState,
//   reducers: {
//     setMode: (state) => {
//       state.mode = state.mode === "light" ? "dark" : "light";
//     },
//   },
// });

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
globalSlice.actions;
export default globalSlice.reducer;


