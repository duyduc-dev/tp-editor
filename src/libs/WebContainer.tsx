import {
  type FileSystemTree,
  type FSWatchCallback,
  type ServerReadyListener,
  type SpawnOptions,
  WebContainer,
} from '@webcontainer/api';

const webContainerInstance = await WebContainer.boot({
  workdirName: 'workspace',
});

class WebContainerManager {
  async runCMD(cmd: string, args: string[] = [], opts?: SpawnOptions) {
    return webContainerInstance.spawn(cmd, args, opts);
  }

  async onServerReady(listen: ServerReadyListener) {
    return webContainerInstance.on('server-ready', listen);
  }

  async mount(files: FileSystemTree | Uint8Array | ArrayBuffer) {
    return webContainerInstance.mount(files);
  }

  async readFile(filePath: string) {
    return webContainerInstance.fs.readFile(filePath, 'utf-8');
  }
  async readDir(filePath: string) {
    return webContainerInstance.fs.readdir(filePath, 'utf-8');
  }
  async writeFile(filePath: string, value: string = '') {
    return webContainerInstance.fs.writeFile(filePath, value, { encoding: 'utf-8' });
  }

  async mkdir(filePath: string) {
    return webContainerInstance.fs.mkdir(filePath, { recursive: true });
  }
  async renameFile(oldPath: string, newPath: string) {
    return webContainerInstance.fs.rename(oldPath, newPath);
  }
  async deleteFile(path: string) {
    return webContainerInstance.fs.rm(path, {
      force: true,
      recursive: true,
    });
  }

  async watchFile(filename: string, listener: FSWatchCallback) {
    return webContainerInstance.fs.watch(filename, { persistent: true }, listener);
  }
}
export default new WebContainerManager();
