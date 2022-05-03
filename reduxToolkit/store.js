import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./cartSlice";
// import watchListReducer from "./watchListSlice";
import userSlice from "./userSlice";

export default store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
