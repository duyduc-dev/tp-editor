import type { Reducer } from '@reduxjs/toolkit';

import store from '@/stores';

import { GlobalState } from './state';

export type GlobalStateKeyType = keyof GlobalState;

export type ReducerDefault = (state: GlobalState) => GlobalState;

export type RequiredGlobalState = Required<GlobalState>;

export type ReturnReducer = Reducer<GlobalState> | ReducerDefault;

export type InjectReducerType = {
  [R in GlobalStateKeyType]: Reducer<RequiredGlobalState[R]>;
};

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
