import { configureStore } from "@reduxjs/toolkit";
import authenticateUserReducer from "./features/userAuth/userAuthSlice";

export const store = configureStore({
  reducer: {
    authUser: authenticateUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
