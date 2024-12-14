import { Nullable } from '@/types/common';
import { FileExploreTreeType } from '@/types/FileManager';

export type RenameFilePayload = {
  file: Nullable<FileExploreTreeType>;
  newName: string;
  dispatchEvent?: boolean;
};
