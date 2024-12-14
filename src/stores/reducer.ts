import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { editorReducer } from '@/pages/editor/slice';

import { GlobalState } from './state';
import { createReducer } from './utils';

const rootReducer = createReducer({
  editor: editorReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const persistedReducer = persistReducer<GlobalState>(persistConfig, rootReducer as any);

export default persistedReducer;
