import { FileExploreTreeType } from '@/types/FileManager';

export enum SideBarEditorType {
  FILES_EXPLORE,
  SEARCH,
  SETTINGS,
}

export type EditorToggleFolder = {
  file: Partial<FileExploreTreeType>;
  open: boolean;
};
