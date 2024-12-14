import { HttpDataResponse } from '@/http/types';

import { FileExploreType } from './FileManager';

export type ProjectResponse = HttpDataResponse<{
  id: string;
  type: string;
  title: string;
  description: string;
  mode: string;
  slug: string;
  fileExplore: FileExploreType[];
}>;

export type ProjectQueryRequest = {
  pageNumber?: number;
  pageSize?: number;
  sortType?: 'ASC' | 'DESC';
  searchKey?: string;
  userId?: string;
  isTemplate?: boolean;
};
