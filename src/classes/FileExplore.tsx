import { type FileSystemTree } from '@webcontainer/api';
import { clone, orderBy } from 'lodash';

import { Nullable, WithRequired } from '@/types/common';
import {
  FileExploreStatus,
  FileExploreTreeType,
  FileExploreType,
  FileType,
  NewFileType,
} from '@/types/FileManager';
import { isStringValid } from '@/utils/helper';

const rootId = '__root__';

class FileExplore {
  static readonly ROOT_ID = rootId;
  private root: FileExploreType[] = [];
  private newFile: Nullable<NewFileType> = null;

  constructor(files?: FileExploreType[]) {
    if (files) {
      this.fileExplore = files;
    }
    this.newFile = null;
  }

  // get - set
  get fileExplore() {
    return this.root;
  }

  set fileExplore(data: FileExploreType[]) {
    this.root = orderBy(data, ['type', 'depth', 'name'], 'asc');
  }

  includes(file?: Nullable<FileExploreType | NewFileType>): boolean {
    if (!file || !file.id) {
      return false;
    }
    const index = this.fileExplore.findIndex((item) => item.id === file.id);
    return index > -1;
  }

  updateFile(file: WithRequired<Partial<FileExploreType>, 'id'>) {
    if (!file.projectId?.trim() || !isStringValid(file.name) || !file.id.trim()) {
      return;
    }
    const fileIndex = this.fileExplore.findIndex((item) => item.id === file.id);
    if (fileIndex > -1) {
      const currentFile = this.fileExplore[fileIndex];
      this.fileExplore[fileIndex] = clone({
        ...currentFile,
        ...file,
        path: '',
      });
      this.fileExplore[fileIndex].path = this.getFilePath(this.fileExplore[fileIndex]);
      const updatedFile = this.fileExplore[fileIndex];
      this.newFile = null;
      this.orderFileExplore();
      return updatedFile;
    }
  }

  addNewFile(file: Nullable<NewFileType>) {
    if (file) {
      this.fileExplore.push({
        depth: file.depth ?? 0,
        id: file.id ?? '',
        path: '',
        projectId: file.projectId || '',
        parentId: file.parentId,
        name: '',
        type: file.type,
        fileStatus: FileExploreStatus.NEW_FILE,
      });
      this.newFile = file;
      this.orderFileExplore();
      return;
    }
    if (this.newFile) {
      const index = this.fileExplore.findIndex((item) => item.id === this.newFile?.id);
      if (index > -1) {
        this.fileExplore.splice(index, 1);
      }
    }
    this.newFile = null;
  }

  deleteFile(file: FileExploreType) {
    const index = this.fileExplore.findIndex((item) => item.id === file.id);
    if (index > -1) {
      this.fileExplore.splice(index, 1);
    }
    return index > -1;
  }

  renameFile(file: FileExploreType, name: string) {
    if (file.id === this.newFile?.id) {
      this.newFile = null;
    }
    const index = this.fileExplore.findIndex((item) => item.id === file.id);
    if (index > -1) {
      this.fileExplore[index] = {
        ...file,
        name,
      };
      this.fileExplore[index].path = this.getFilePath(this.fileExplore[index]);
      const newFile = this.fileExplore[index];
      this.orderFileExplore();
      return newFile;
    }
  }

  toFileSystemTree(): FileSystemTree {
    const listTreeFormatted = this.toFileExploreTree();
    return this.convertToFileSystemTree(listTreeFormatted.children);
  }

  toFileExploreTree(): FileExploreTreeType {
    const root: FileExploreTreeType = {
      id: FileExplore.ROOT_ID,
      name: FileExplore.ROOT_ID,
      type: FileType.DIRECTORY,
      projectId: FileExplore.ROOT_ID,
      depth: -1,
      path: '',
      children: [],
    };
    const rootClone = clone(this.fileExplore);
    rootClone.forEach((item) => this.insertToNode(root, item));
    return root;
  }

  private convertToFileSystemTree(tree: FileExploreTreeType[]): FileSystemTree {
    const fileSystemTree: FileSystemTree = {};

    for (const node of tree) {
      if (node.type === FileType.FILE) {
        fileSystemTree[node.name] = {
          file: {
            contents: node.content!,
          },
        };
      } else if (node.type === FileType.DIRECTORY) {
        fileSystemTree[node.name] = {
          directory: this.convertToFileSystemTree(node.children || []),
        };
      }
    }

    return fileSystemTree;
  }

  private insertToNode(root: FileExploreTreeType, newItem: FileExploreType) {
    const prefixPath = root.id === FileExplore.ROOT_ID ? '' : '/' + root.name;
    const filePath = `/${newItem.name}`;

    if (newItem.depth === 0 && !newItem.parentId) {
      root.children.push({
        ...newItem,
        path: filePath,
        children: [],
      });
      return;
    }
    root.children.forEach((nodeItem) => {
      if (nodeItem.id === newItem.parentId) {
        nodeItem.children.push({
          ...newItem,
          path: `${prefixPath}/${nodeItem.name}` + filePath,
          children: [],
        });
        return;
      } else {
        this.insertToNode(nodeItem, {
          ...newItem,
          path: `${prefixPath}/${nodeItem.name}` + filePath,
        });
      }
    });
  }

  clone() {
    return clone(this);
  }

  getFilePath(file: FileExploreType | NewFileType | FileExploreTreeType) {
    let path = file.name?.trim()
      ? (file.name.startsWith('/') ? '' : '/') + `${file.name.trim()}`
      : '';

    if (file.parentId) {
      const findData = this.fileExplore.find((item) => item.id === file.parentId);
      if (findData) {
        path = this.getFilePath(findData) + path;
      }
    }
    return path;
  }

  private orderFileExplore() {
    this.fileExplore = orderBy(this.fileExplore, ['type', 'depth', 'name'], 'asc');
  }
}

export default FileExplore;
