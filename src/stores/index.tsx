import { configureStore } from '@reduxjs/toolkit';
import { createContext, PropsWithChildren } from 'react';
import type { ReactReduxContextValue } from 'react-redux';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import persistedReducer from './reducer';
import { GlobalState } from './state';

const store = configureStore<GlobalState>({
  reducer: persistedReducer as any,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(),
  devTools: true,
});

export const StoreContext = createContext<ReactReduxContextValue<GlobalState> | null>(null);

export const persistor = persistStore(store);

export const GlobalStateProvider = ({ children }: PropsWithChildren) => (
  <Provider store={store} context={StoreContext}>
    <PersistGate persistor={persistor}>{children}</PersistGate>
  </Provider>
);

export default store;
