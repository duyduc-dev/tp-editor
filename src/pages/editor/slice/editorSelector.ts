import { createSelector } from '@reduxjs/toolkit';

import { GlobalState } from '@/stores/state';
import { getPropertyObject } from '@/utils/helper';

import { EditorState, initialEditorState } from './editorSlice';

export const editorSelector = (state: GlobalState): EditorState =>
  getPropertyObject(state, 'editor') ?? initialEditorState;
export const selectFileExplore = createSelector(editorSelector, (state) =>
  getPropertyObject(state, 'fileExplore'),
);
export const selectProjectDetail = createSelector(editorSelector, (state) =>
  getPropertyObject(state, 'projectDetail'),
);
export const selectFileRename = createSelector(editorSelector, (state) =>
  getPropertyObject(state, 'fileRename'),
);
export const selectUrlHosting = createSelector(editorSelector, (state) =>
  getPropertyObject(state, 'urlHosting'),
);
export const selectFileSelected = createSelector(editorSelector, (state) =>
  getPropertyObject(state, 'fileSelected'),
);
export const selectFileOpening = createSelector(editorSelector, (state) =>
  getPropertyObject(state, 'fileOpening'),
);
export const selectFileForceTab = createSelector(editorSelector, (state) =>
  getPropertyObject(state, 'fileForceTab'),
);
export const selectNewFile = createSelector(editorSelector, (state) =>
  getPropertyObject(state, 'newFile'),
);
export const selectTabEditor = createSelector(editorSelector, (state) =>
  getPropertyObject(state, 'tabEditor'),
);
