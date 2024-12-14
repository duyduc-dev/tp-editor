import {
  combineReducers,
  createSlice as createSliceOriginal,
  type CreateSliceOptions,
  type SliceCaseReducers,
} from '@reduxjs/toolkit';

import { GlobalState } from './state';
import { GlobalStateKeyType, InjectReducerType, ReturnReducer } from './types';

export const createReducer = (reducers: InjectReducerType): ReturnReducer => {
  if (Object.keys(reducers).length === 0) {
    return (state: GlobalState) => state;
  }
  return combineReducers({
    ...reducers,
  });
};

export const createSlice = <
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends GlobalStateKeyType,
>(
  options: CreateSliceOptions<State, CaseReducers, Name>,
) => {
  return createSliceOriginal(options);
};
