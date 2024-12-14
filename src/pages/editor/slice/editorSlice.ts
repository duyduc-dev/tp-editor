import { type PayloadAction } from '@reduxjs/toolkit';
import { clone } from 'lodash';

import FileExplore from '@/classes/FileExplore';
import { createSlice } from '@/stores/utils';
import { Nullable } from '@/types/common';
import {
  FileExploreStatus,
  FileExploreTreeType,
  FileExploreType,
  FileType,
  NewFileType,
} from '@/types/FileManager';
import { ProjectResponse } from '@/types/project';
import EventHelper from '@/utils/EventHelper';

import {
  EVENT_TERMINAL_ACTION,
  TerminalActionData,
  TerminalActionType,
} from '../components/EditorTerminal';
import { FileHelper } from '../helper';
import { RenameFilePayload } from './types';

export type EditorState = {
  projectDetail: Nullable<ProjectResponse>;
  fileExplore: Nullable<FileExplore>;
  fileSelected: Nullable<FileExploreTreeType>;
  fileRename: Nullable<FileExploreTreeType>;
  fileOpening: Nullable<FileExploreTreeType>;
  fileForceTab: Nullable<FileExploreTreeType>;
  newFile: Nullable<NewFileType>;
  tabEditor: FileExploreTreeType[];
  urlHosting: Nullable<string>;
};

export const initialEditorState: EditorState = {
  projectDetail: null,
  fileExplore: null,
  fileSelected: null,
  fileRename: null,
  urlHosting: null,
  fileOpening: null,
  fileForceTab: null,
  newFile: null,
  tabEditor: [],
};
const editorSlice = createSlice({
  name: 'editor',
  initialState: initialEditorState,
  reducers: {
    setProjectDetail(state, action: PayloadAction<Nullable<ProjectResponse>>) {
      if (action.payload) {
        state.projectDetail = action.payload;
        state.fileExplore = new FileExplore(action.payload?.fileExplore ?? undefined);
      } else {
        state.projectDetail = null;
        state.fileExplore = null;
        state.urlHosting = null;
        state.tabEditor = [];
      }
    },
    setFileExplore(state, action: PayloadAction<Nullable<FileExploreType[]>>) {
      state.fileExplore = new FileExplore(action.payload ?? undefined);
    },
    setFileSelected(state, action: PayloadAction<Nullable<FileExploreTreeType>>) {
      state.fileSelected = action.payload;
    },
    setFileRename(state, action: PayloadAction<Nullable<FileExploreTreeType>>) {
      state.fileRename = action.payload;
    },
    setFileForceTab(state, action: PayloadAction<Nullable<FileExploreTreeType>>) {
      state.fileForceTab = action.payload;
    },
    deleteFile(state, action: PayloadAction<Nullable<FileExploreTreeType>>) {
      const fileDelete = action.payload;
      const fileExplore = state.fileExplore;
      if (fileDelete) {
        const isFileDeleted = fileExplore?.deleteFile(fileDelete);
        if (isFileDeleted) {
          state.fileExplore = clone(fileExplore);
          EventHelper.dispatch<TerminalActionData>(EVENT_TERMINAL_ACTION, {
            action: TerminalActionType.REMOVE,
            file: fileDelete,
          });
        }
      }
      state.fileSelected = null;
    },
    renameFile(state, action: PayloadAction<RenameFilePayload>) {
      const { file, newName, dispatchEvent = true } = action.payload;
      if (file) {
        if (file.id === state.newFile?.id) {
          state.newFile = null;
        }
        const fileExplore = state.fileExplore;
        const newFile = fileExplore?.renameFile(file, newName);
        if (newFile) {
          state.fileExplore = clone(fileExplore);
          if (dispatchEvent)
            EventHelper.dispatch<TerminalActionData>(EVENT_TERMINAL_ACTION, {
              action: TerminalActionType.RENAME,
              file: {
                ...newFile,
                children: [],
              },
              oldFile: file,
            });
        }
      }
    },
    setUrlHosting: (state, action: PayloadAction<string>) => {
      state.urlHosting = action.payload;
    },
    setFileOpening(state, action: PayloadAction<Nullable<FileExploreTreeType>>) {
      state.fileOpening = action.payload;
    },
    addTabEditor: (state, action: PayloadAction<FileExploreTreeType>) => {
      const added = FileHelper.addTabEditor(
        state.tabEditor,
        action.payload,
        state.fileForceTab,
        state.fileOpening,
      );
      if (added) {
        state.fileForceTab = action.payload;
        state.fileOpening = action.payload;
      }
    },
    closeTab: (state, action: PayloadAction<Nullable<FileExploreTreeType>>) => {
      const data = action.payload;
      let fileOpening = state.fileOpening;
      const tabs = clone(state.tabEditor);
      const fileIndex = tabs.findIndex((item) => item.id === data?.id);
      tabs.splice(fileIndex, 1);
      if (fileOpening?.id === data?.id) {
        const nextTab = tabs?.[fileIndex] || tabs?.[fileIndex - 1];
        if (nextTab) {
          fileOpening = nextTab;
        } else fileOpening = null;
      }
      state.fileOpening = fileOpening;
      state.tabEditor = tabs;
    },
    addNewFile(state, action: PayloadAction<Nullable<NewFileType>>) {
      const file = action.payload;
      const proj = state.projectDetail;
      const fileExplore = state.fileExplore;
      const fileSelected = state.fileSelected;
      if (file && file.fileStatus !== FileExploreStatus.COMPLETED && proj?.id) {
        const newFile = FileHelper.createNewFile(proj?.id, file, fileSelected);
        fileExplore?.addNewFile(newFile);
        state.fileExplore = clone(fileExplore);
        state.newFile = newFile;
        if (state.fileRename) {
          state.fileRename = null;
        }
      } else if (file?.fileStatus === FileExploreStatus.COMPLETED) {
        const fileUpdated = fileExplore?.updateFile({
          projectId: state.projectDetail?.id,
          id: file.id ?? '',
          ...file,
          fileStatus: undefined,
        });
        if (fileUpdated) {
          state.fileExplore = clone(fileExplore);
          state.fileRename = null;
          state.newFile = null;
          EventHelper.dispatch<TerminalActionData>(EVENT_TERMINAL_ACTION, {
            action: TerminalActionType.CREATE,
            file: {
              ...fileUpdated,
              children: [],
            },
          });
          if (fileUpdated.type === FileType.FILE) {
            const added = FileHelper.addTabEditor(
              state.tabEditor,
              { ...fileUpdated, children: [] },
              state.fileForceTab,
              state.fileOpening,
            );
            if (added) {
              state.fileForceTab = { ...fileUpdated, children: [] };
              state.fileOpening = state.fileForceTab;
            }
          }
        }
      } else {
        state.newFile = null;
        fileExplore?.addNewFile(null);
        state.fileExplore = fileExplore?.clone() ?? null;
      }
    },
    clearEditorData() {
      return initialEditorState;
    },
  },
});

const { reducer: editorReducer, actions } = editorSlice;

export const {
  addNewFile,
  addTabEditor,
  closeTab,
  deleteFile,
  renameFile,
  setFileExplore,
  setFileForceTab,
  setFileOpening,
  setFileRename,
  setFileSelected,
  setProjectDetail,
  setUrlHosting,
  clearEditorData,
} = actions;

export default editorReducer;
