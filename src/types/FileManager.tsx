import { HttpDataResponse } from '@/http/types';

import { WithRequired } from './common';

export enum FileType {
  FILE = 'FILE',
  DIRECTORY = 'DIRECTORY',
}

export type FileExploreType = HttpDataResponse<{
  id: string;
  type: FileType;
  name: string;
  parentId?: string;
  depth: number;
  path: string;
  projectId: string;
  content?: string;
  fileStatus?: FileExploreStatus;
}>;

export interface FileExploreTreeType extends FileExploreType {
  children: FileExploreTreeType[];
}

export type NewFileExplore = {
  projectId: string;
  name: string;
  parentId?: string;
  content?: string;
  depth: number;
  type: FileType;
};

export enum FileExploreStatus {
  NEW_FILE,
  PENDING,
  COMPLETED,
}

export type NewFileType = WithRequired<Partial<FileExploreType>, 'type'>;
