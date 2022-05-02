import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import watchListReducer from "./watchListSlice";
import userSlice from "./userSlice";
import ignoreSlice from "./ignoreSlice";

export default store = configureStore({
  reducer: {
    user: userSlice,
    ignore: ignoreSlice,
    cart: cartReducer,
    watchList: watchListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
