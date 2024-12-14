import { find } from 'lodash';

import { Nullable } from '@/types/common';
import { FileExploreStatus, FileExploreTreeType, NewFileType } from '@/types/FileManager';
import { generateUUID, select } from '@/utils/helper';

class FileHelper {
  createNewFile(
    projectId: string,
    file: NewFileType,
    fileSelected?: Nullable<FileExploreTreeType>,
  ): NewFileType {
    const depth = select(fileSelected?.type, {
      DIRECTORY: (fileSelected?.depth ?? 0) + 1,
      FILE: fileSelected?.depth ?? 0,
      _default: 0,
    }) as number;
    const parentId = select(fileSelected?.type, {
      _default: undefined,
      FILE: fileSelected?.parentId,
      DIRECTORY: fileSelected?.id,
    });
    const newFile: NewFileType = {
      depth: depth,
      parentId,
      id: generateUUID(),
      projectId: projectId,
      fileStatus: FileExploreStatus.NEW_FILE,
      ...file,
      path: '',
    };
    return newFile;
  }

  addTabEditor(
    tabs: FileExploreTreeType[],
    newTab: FileExploreTreeType,
    forceTab?: FileExploreTreeType | null,
    fileOpening?: FileExploreTreeType | null,
  ) {
    const isExistNewTab = find(tabs, (item) => item.id === newTab.id);
    if (isExistNewTab) {
      return false;
    }
    let indexNewTab = tabs.length;
    let isReplace = false;
    if (forceTab) {
      const indexTab = tabs.findIndex((item) => item.id === forceTab?.id);
      if (indexTab > -1) {
        indexNewTab = indexTab;
        isReplace = true;
      }
    }

    if (!isReplace && fileOpening?.id) {
      const indexTab = tabs.findIndex((item) => item.id === fileOpening?.id);
      if (indexTab > -1) {
        indexNewTab = indexTab + 1;
      }
    }

    tabs.splice(indexNewTab, isReplace ? 1 : 0, newTab);
    return true;
  }
}

export default new FileHelper();
