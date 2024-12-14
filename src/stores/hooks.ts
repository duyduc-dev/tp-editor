import { type ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { DependencyList, useMemo } from 'react';
import {
  createDispatchHook,
  createSelectorHook,
  createStoreHook,
  type TypedUseSelectorHook,
} from 'react-redux';

import { StoreContext } from './index';
import { GlobalState } from './state';
import { AppDispatch, AppStore } from './types';

export const useStore: () => AppStore = createStoreHook(StoreContext);
export const useAppDispatch: () => AppDispatch = createDispatchHook(StoreContext);
export const useAppSelector: TypedUseSelectorHook<GlobalState> = createSelectorHook(StoreContext);

export const useActions = <T extends object>(
  actions: ActionCreatorsMapObject,
  deps?: DependencyList | undefined,
): T => {
  const dispatch = useAppDispatch();

  return useMemo<T>((): T => {
    if (Array.isArray(actions)) {
      return actions.map((a) => bindActionCreators(a, dispatch)) as unknown as T;
    }
    return bindActionCreators(actions as ActionCreatorsMapObject, dispatch) as unknown as T;
  }, [deps, dispatch]);
};
