import httpRequest from '@/http/Axios';
import { FileExploreType, NewFileExplore } from '@/types/FileManager';

import { ApiPath } from './ApiPath';

class FileExploreApi {
  async newFile(data: NewFileExplore) {
    const res = await httpRequest.post<NewFileExplore, FileExploreType>(
      ApiPath.fileExplore.index,
      data,
    );
    return res.data;
  }
}

export default new FileExploreApi();
