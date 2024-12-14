import { type IFSWatcher } from '@webcontainer/api';
import { useInput, useKeyPressHandler, useOnClickOutside } from 'hooks-react-custom';
import { memo, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useContextMenu } from 'react-contexify';
import { useTranslation } from 'react-i18next';
import {
  LuChevronDown,
  LuChevronRight,
  LuFilePlus2,
  LuFolderPlus,
  LuPencil,
  LuTrash2,
} from 'react-icons/lu';
import { useTheme } from 'styled-components';

import FileIcon from '@/components/FileIcon';
import useIdleCallback from '@/hooks/useIdleCallback';
import WebContainer from '@/libs/WebContainer';
import { useActions, useAppSelector } from '@/stores/hooks';
import { MouseEventClick, Nullable } from '@/types/common';
import { FileExploreStatus, FileExploreTreeType, FileType, NewFileType } from '@/types/FileManager';
import EventHelper, { EventKeys } from '@/utils/EventHelper';
import { isStringValid } from '@/utils/helper';

import {
  addNewFile,
  addTabEditor,
  deleteFile,
  renameFile,
  selectFileForceTab,
  selectFileRename,
  selectFileSelected,
  selectNewFile,
  setFileForceTab,
  setFileOpening,
  setFileRename,
  setFileSelected,
} from '../../slice';
import { RenameFilePayload } from '../../slice/types';
import { EditorToggleFolder } from '../../types';
import {
  CONTEXT_MENU_EVENT_EXPLORE,
  CONTEXT_MENU_FILE_ITEM_ID,
  ContextMenuExploreEventData,
  ContextMenuFileExploreType,
} from '../ContextMenuFileItem';
import {
  InputRenameStyled,
  TextStyled,
  WrapperActionsStyled,
  WrapperFileItemStyled,
  WrapperFileNameStyled,
  WrapperInputRenameStyled,
} from './styled';

type Props = {
  file: FileExploreTreeType;
  isExpand?: boolean;
};

type ActionsDispatch = {
  addTabEditorAction: (tab: FileExploreTreeType) => void;
  deleteFileAction: (data: Nullable<FileExploreTreeType>) => void;
  renameFileAction: (data: RenameFilePayload) => void;
  setFileForceTabAction: (data: Nullable<FileExploreTreeType>) => void;
  setFileOpeningAction: (data: Nullable<FileExploreTreeType>) => void;
  setFileRenameAction: (data: Nullable<FileExploreTreeType>) => void;
  setFileSelectedAction: (data: Nullable<FileExploreTreeType>) => void;
  addNewFileAction: (file: Nullable<NewFileType>) => void;
};

const FileItem = ({ file, isExpand }: Props) => {
  const { colors } = useTheme();

  const { t } = useTranslation();

  const {
    addTabEditorAction,
    deleteFileAction,
    renameFileAction,
    setFileForceTabAction,
    setFileRenameAction,
    setFileSelectedAction,
    addNewFileAction,
  } = useActions<ActionsDispatch>({
    addTabEditorAction: addTabEditor,
    deleteFileAction: deleteFile,
    renameFileAction: renameFile,
    setFileForceTabAction: setFileForceTab,
    setFileOpeningAction: setFileOpening,
    setFileRenameAction: setFileRename,
    setFileSelectedAction: setFileSelected,
    addNewFileAction: addNewFile,
  });

  const newFile = useAppSelector(selectNewFile);
  const fileRename = useAppSelector(selectFileRename);
  const fileSelected = useAppSelector(selectFileSelected);
  const fileForceTab = useAppSelector(selectFileForceTab);

  const inputRef = useRef<HTMLInputElement>(null);

  const { value, setValue, eventBind } = useInput(file.name ?? '');
  const [canClick, setCanClick] = useState(true);

  const { show } = useContextMenu<{ file: FileExploreTreeType }>({
    id: CONTEXT_MENU_FILE_ITEM_ID,
  });

  const handleClick = () => {
    if (!canClick) {
      setCanClick(true);
      return;
    }
    setFileSelectedAction(file);
    if (file.type === FileType.FILE) {
      addTabEditorAction(file);
    }
  };

  const handleDoubleClick = () => {
    if (fileForceTab?.id === file.id && file.type === FileType.FILE) {
      setFileForceTabAction(null);
    }
  };

  const handlePointerDown = () => {
    if (fileRename && fileRename.id !== file.id) {
      setCanClick(false);
      EventHelper.dispatch('file:file-clicked');
    }
  };

  const doRenameFile = (_file?: FileExploreTreeType) => {
    setFileRenameAction(_file ?? null);
    requestIdleCallback(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, value.lastIndexOf('.') || value.length);
    });
  };

  const handleClickRename: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    doRenameFile(file);
  };

  const handleClickTrash: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    deleteFileAction(file);
  };
  const handleClickNewFile = (e: MouseEventClick, fileType: FileType) => {
    e.stopPropagation();
    addNewFileAction({
      type: fileType,
      parentId: file.id,
      depth: file.depth + 1,
    });
    EventHelper.dispatch<EditorToggleFolder>(EventKeys.EDITOR_COLLAPSE_FOLDER_TOGGLE, {
      file: file,
      open: true,
    });
  };

  const handlePressEnter = () => {
    if (isStringValid(value) && (fileRename?.id === file.id || newFile?.id === file.id)) {
      if (fileRename?.id === file.id && !newFile) {
        renameFileAction({
          file: file,
          newName: value,
        });
        fileRename && setFileRenameAction(null);
      } else if (newFile?.id === file.id && !fileRename) {
        addNewFileAction({
          name: value,
          type: file.type,
          id: file.id,
          fileStatus: FileExploreStatus.COMPLETED,
        });
      }
    }
  };

  const handlePressEsc = () => {
    setValue(file.name);
    requestIdleCallback(() => {
      fileRename && setFileRenameAction(null);
      newFile && addNewFileAction(null);
    });
  };

  const handleClickOutsideInput = () => {
    if (fileRename?.id === file.id && !newFile) {
      if (!isStringValid(value)) {
        setValue(file.name);
      } else {
        renameFileAction({
          file: file,
          newName: value,
        });
      }
      setFileRenameAction(null);
    }
    if (newFile?.id === file.id && !fileRename) {
      if (!isStringValid(value)) {
        addNewFileAction(null);
      } else {
        addNewFileAction({
          name: value,
          type: file.type,
          id: file.id,
          fileStatus: FileExploreStatus.COMPLETED,
        });
      }
    }
  };

  useKeyPressHandler('enter', handlePressEnter);
  useKeyPressHandler('esc', handlePressEsc);
  useOnClickOutside(inputRef, handleClickOutsideInput);

  useIdleCallback(() => {
    newFile && inputRef.current?.focus();
  }, [newFile]);

  useEffect(() => {
    const remove = EventHelper.subscriber('file:file-clicked', () => {
      if (fileRename?.id !== file.id) {
        return;
      }
      if (!isStringValid(value)) {
        setValue(file.name);
      } else {
        renameFileAction({
          file: file,
          newName: value,
        });
      }
      setFileRenameAction(null);
    });
    return remove;
  }, [file, fileRename, value]);

  useEffect(() => {
    const remove = EventHelper.subscriber<ContextMenuExploreEventData>(
      CONTEXT_MENU_EVENT_EXPLORE,
      (e) => {
        switch (e.detail.type) {
          case ContextMenuFileExploreType.RENAME:
            doRenameFile(e.detail.file);
            break;
          case ContextMenuFileExploreType.DELETE:
            deleteFileAction(e.detail.file ?? null);
            break;
        }
      },
    );
    return remove;
  }, []);

  useEffect(() => {
    let remove: IFSWatcher | undefined;
    (async () => {
      const parentPathArray = file.path.split('/');
      parentPathArray.pop();
      const parentPath = parentPathArray.join('/') || '/';
      const prevDir = await WebContainer.readDir('/project' + parentPath);
      remove = await WebContainer.watchFile('/project' + file.path, async (event, fileName) => {
        if (event === 'rename' && fileName === file.name) {
          const current = await WebContainer.readDir('/project' + parentPath);
          const newName = current.filter((x) => !prevDir.includes(x));
          // console.log(`remove=awaitWebContainer.watchFile ~ newName:`, { newName, prevDir });
          renameFileAction({
            file: file,
            newName: newName[0],
            dispatchEvent: false,
          });
        }

        // console.log({ file, event, fileName });
      });
    })();
    return () => remove?.close();
  }, [file]);

  return (
    <>
      <WrapperFileNameStyled
        onContextMenu={(e: any) =>
          show({
            event: e,
            props: {
              file,
            },
          })
        }
        disabled={!!fileRename && fileRename.id !== file.id}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onPointerDown={handlePointerDown}
        $isSelected={fileSelected?.id === file.id}
        $fileType={file.type}
        $depth={file.depth}
      >
        {file.type === FileType.DIRECTORY && (
          <>
            {isExpand ? (
              <LuChevronDown size={16} color={colors.neutral300} />
            ) : (
              <LuChevronRight size={16} color={colors.neutral300} />
            )}
          </>
        )}
        <WrapperFileItemStyled>
          <FileIcon fileName={value} isExpand={isExpand} fileType={file.type} />
          {fileRename?.id === file.id || newFile?.id === file.id ? (
            <WrapperInputRenameStyled
              $disableError={!!newFile}
              aria-label={value}
              data-value-error={t`fileOrFolderNameMustBeProvided`}
            >
              <InputRenameStyled
                $disableError={!!newFile}
                ref={inputRef}
                {...eventBind}
                type="text"
              />
            </WrapperInputRenameStyled>
          ) : (
            <TextStyled>{value}</TextStyled>
          )}
        </WrapperFileItemStyled>
        <WrapperActionsStyled>
          {fileRename?.id !== file.id && newFile?.id !== file.id && (
            <>
              {file.type === FileType.DIRECTORY && (
                <>
                  <div role="presentation" onClick={(e) => handleClickNewFile(e, FileType.FILE)}>
                    <LuFilePlus2 className="icon-action pencil-icon" size={12} />
                  </div>
                  <div
                    role="presentation"
                    onClick={(e) => handleClickNewFile(e, FileType.DIRECTORY)}
                  >
                    <LuFolderPlus className="icon-action pencil-icon" size={12} />
                  </div>
                </>
              )}
              <div role="presentation" onClick={handleClickRename}>
                <LuPencil className="icon-action pencil-icon" size={12} />
              </div>
              <div role="presentation" onClick={handleClickTrash}>
                <LuTrash2 className="icon-action trash-icon" size={12} />
              </div>
            </>
          )}
        </WrapperActionsStyled>
      </WrapperFileNameStyled>
    </>
  );
};

export default memo(FileItem);
