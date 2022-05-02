import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  addresses: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,

  reducers: {
    logOut: () => initialState,
    logIn: (state, { payload }) => {
      if (payload) {
        console.log('USER NAME PAYLOAD: ', payload.name)
        state = {
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          addresses: [...payload.address || null]
        }
        return state
      }
    },
  },
});

export const { logOut, logIn } = userSlice.actions;
export const userSelector = (state) => state.user
export default userSlice.reducer;