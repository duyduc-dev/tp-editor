import { ReactNode } from 'react';
import { BiLogoTypescript } from 'react-icons/bi';
import { FaGitAlt, FaNpm } from 'react-icons/fa';
import { FcFolder, FcOpenedFolder } from 'react-icons/fc';
import { FiFile } from 'react-icons/fi';
import { IoLogoJavascript } from 'react-icons/io';
import { IoLogoCss3, IoLogoHtml5, IoLogoReact } from 'react-icons/io5';
import { TbFileTypeSvg, TbJson } from 'react-icons/tb';

import theme from '@/theme';

import { FileType } from '../../types/FileManager';

const themeColors = theme.colors;

export enum FileIconExtensionKey {
  JAVASCRIPT = 'js',
  TYPESCRIPT = 'ts',
  TYPESCRIPT_REACT = 'tsx',
  FOLDER = 'folder',
  OPENED_FOLDER = 'openedFolder',
  FILE = 'file',
  JSON = 'json',
  PACKAGE_JSON = 'package.json',
  HTML = 'html',
  CSS = 'css',
  GIT_IGNORE = '.gitignore',
  SVG = 'svg',
}

const mappingFileIcon = (size?: number) => {
  const propsIcon = {
    size,
  };
  const mapIcon = new Map<string, ReactNode>();
  mapIcon.set(
    FileIconExtensionKey.JAVASCRIPT,
    <IoLogoJavascript color={themeColors.yellow500} {...propsIcon} />,
  );
  mapIcon.set(FileIconExtensionKey.FOLDER, <FcFolder {...propsIcon} />);
  mapIcon.set(FileIconExtensionKey.OPENED_FOLDER, <FcOpenedFolder {...propsIcon} />);
  mapIcon.set(FileIconExtensionKey.FILE, <FiFile color={themeColors.neutral300} {...propsIcon} />);
  mapIcon.set(FileIconExtensionKey.JSON, <TbJson {...propsIcon} />);
  mapIcon.set(
    FileIconExtensionKey.PACKAGE_JSON,
    <FaNpm color={themeColors.error500} {...propsIcon} />,
  );
  mapIcon.set(
    FileIconExtensionKey.TYPESCRIPT,
    <BiLogoTypescript color={themeColors.blue500} {...propsIcon} />,
  );
  mapIcon.set(
    FileIconExtensionKey.TYPESCRIPT_REACT,
    <IoLogoReact color={themeColors.blue500} {...propsIcon} />,
  );
  mapIcon.set(
    FileIconExtensionKey.HTML,
    <IoLogoHtml5 color={themeColors.error500} {...propsIcon} />,
  );
  mapIcon.set(
    FileIconExtensionKey.CSS,
    <IoLogoCss3 color={themeColors.secondary800} {...propsIcon} />,
  );
  mapIcon.set(
    FileIconExtensionKey.GIT_IGNORE,
    <FaGitAlt color={themeColors.orange500} {...propsIcon} />,
  );
  mapIcon.set(
    FileIconExtensionKey.SVG,
    <TbFileTypeSvg color={themeColors.yellow400} {...propsIcon} />,
  );

  return (ext: string): ReactNode => {
    if (mapIcon.has(ext)) {
      return mapIcon.get(ext);
    }
    return mapIcon.get(FileIconExtensionKey.FILE);
  };
};

class FileIconHelper {
  getFileIcon(ext: string, size?: number) {
    return mappingFileIcon(size)(ext);
  }

  getKeyIcon(str?: string, fileType?: FileType, isExpand?: boolean) {
    if (str && Object.values(FileIconExtensionKey).includes(str as FileIconExtensionKey)) {
      return str;
    }

    if (
      str
        ?.split('.')
        .some((item) => Object.values(FileIconExtensionKey).includes(item as FileIconExtensionKey))
    ) {
      for (const item of str?.split('.') ?? []) {
        if (this.isExistIcon(item)) {
          return item; 
        }
      }
    }
    if (fileType === FileType.DIRECTORY) {
      return isExpand ? FileIconExtensionKey.OPENED_FOLDER : FileIconExtensionKey.FOLDER;
    }
    return FileIconExtensionKey.FILE;
  }

  isExistIcon(str?: string) {
    return (
      !!str &&
      (Object.values(FileIconExtensionKey).includes(str as FileIconExtensionKey) ||
        str
          ?.split('.')
          .some((item) =>
            Object.values(FileIconExtensionKey).includes(item as FileIconExtensionKey),
          ))
    );
  }
}

export default new FileIconHelper();
