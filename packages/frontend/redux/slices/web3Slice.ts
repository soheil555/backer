import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";

interface State {
  provider?: any;
  web3Provider?: any;
  address?: string;
  chainId?: number;
  user?: any;
}

const initialState: State = {
  provider: undefined,
  web3Provider: undefined,
  address: undefined,
  chainId: undefined,
  user: undefined,
};

export const web3Slice = createSlice({
  name: "web3",
  initialState,
  reducers: {
    setWeb3Provider: (state: Draft<State>, action: PayloadAction<State>) => {
      state.provider = action.payload.provider;
      state.web3Provider = action.payload.web3Provider;
      state.address = action.payload.address;
      state.chainId = action.payload.chainId;
      state.user = action.payload.user;
    },
    setAddress: (state: Draft<State>, action: PayloadAction<State>) => {
      state.address = action.payload.address;
    },
    setChainId: (state: Draft<State>, action: PayloadAction<State>) => {
      state.chainId = action.payload.chainId;
    },
    resetWeb3Provider: (state: Draft<State>) => {
      state = initialState;
    },
  },
});

export const { setWeb3Provider, setAddress, setChainId, resetWeb3Provider } =
  web3Slice.actions;
export default web3Slice.reducer;
