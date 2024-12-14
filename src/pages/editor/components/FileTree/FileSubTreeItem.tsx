import { useEffect, useRef, useState } from 'react';

import Collapse, { CollapseRef } from '@/components/Collapse';
import ListRender from '@/components/ListRender';
import { EditorToggleFolder, selectFileRename } from '@/pages/editor';
import { useAppSelector } from '@/stores/hooks';
import { FileExploreTreeType, FileType } from '@/types/FileManager';
import EventHelper, { EventKeys } from '@/utils/EventHelper';

import FileItem from '../FileItem';
import { FileWrapperStyled } from './styled';

type Props = {
  file: FileExploreTreeType;
};

const FileSubTreeItem = ({ file }: Props) => {
  const collapseRef = useRef<CollapseRef>(null);

  const fileRename = useAppSelector(selectFileRename);

  const [disable, setDisable] = useState(false);

  useEffect(() => {
    const removeEvent = EventHelper.subscriber(EventKeys.EDITOR_FILE_EXPLORE_COLLAPSE_SMALL, () =>
      collapseRef.current?.closeAll(),
    );
    return () => {
      removeEvent();
    };
  }, []);

  useEffect(() => {
    let id: any = 0;
    if (!fileRename) {
      id = setTimeout(() => {
        setDisable(false);
      }, 200);
    } else {
      setDisable(true);
    }
    return () => clearTimeout(id);
  }, [fileRename]);

  useEffect(() => {
    const removeEventCollapseFolder = EventHelper.subscriber<EditorToggleFolder>(
      EventKeys.EDITOR_COLLAPSE_FOLDER_TOGGLE,
      ({ detail: { file: _fileEvent, open } }) => {
        if (_fileEvent?.id === file.id) {
          if (file.parentId) {
            EventHelper.dispatch<EditorToggleFolder>(EventKeys.EDITOR_COLLAPSE_FOLDER_TOGGLE, {
              open: true,
              file: { id: file.parentId },
            });
          }
          if (open) {
            collapseRef.current?.openIndex(0);
          } else {
            collapseRef.current?.closeIndex(0);
          }
        }
      },
    );
    return removeEventCollapseFolder;
  }, [file]);

  return (
    <FileWrapperStyled>
      {file.type === FileType.DIRECTORY ? (
        <Collapse
          keyExtractor={(item) => `${item.id}-${item.name}`}
          disabled={disable}
          innerRef={collapseRef}
          data={[file]}
          renderLabel={({ item, isExpand }) => <FileItem file={item} isExpand={isExpand} />}
          renderContent={({ item }) => (
            <ListRender
              keyExtractor={(childItem) => `${childItem.id}-${childItem.name}`}
              data={item.children}
              renderItem={(childItem) => <FileSubTreeItem file={childItem} />}
            />
          )}
        />
      ) : (
        <FileItem file={file} />
      )}
    </FileWrapperStyled>
  );
};

export default FileSubTreeItem;
