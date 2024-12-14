import { useOnClickOutside } from 'hooks-react-custom';
import { useRef } from 'react';

import ListRender from '@/components/ListRender';
import {
  selectFileExplore,
  selectFileRename,
  selectFileSelected,
  selectNewFile,
  setFileSelected,
} from '@/pages/editor';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';

import ContextMenuFileItem from '../ContextMenuFileItem';
import FileSubTreeItem from './FileSubTreeItem';

const FileTree = () => {
  const fileExplore = useAppSelector(selectFileExplore);
  const fileSelected = useAppSelector(selectFileSelected);
  const fileRename = useAppSelector(selectFileRename);
  const newFile = useAppSelector(selectNewFile);
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    if (fileSelected && (!fileRename || !newFile)) {
      dispatch(setFileSelected(null));
    }
  };

  useOnClickOutside(ref, handleClickOutside, 'click' as any);

  return (
    <div ref={ref}>
      <ListRender
        keyExtractor={(item) => `${item.id}-${item.name}`}
        data={fileExplore?.toFileExploreTree().children ?? []}
        renderItem={(item) => <FileSubTreeItem file={item} />}
      />
      <ContextMenuFileItem />
    </div>
  );
};

export default FileTree;
