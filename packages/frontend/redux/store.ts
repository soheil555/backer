import { configureStore } from "@reduxjs/toolkit";
import web3Slice from "./slices/web3Slice";

const store = configureStore({
  reducer: {
    web3: web3Slice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
