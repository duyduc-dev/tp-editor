import { Item, ItemParams } from 'react-contexify';
import { useTranslation } from 'react-i18next';
import { LuPencil, LuTrash2 } from 'react-icons/lu';

import { FileExploreTreeType } from '@/types/FileManager';
import EventHelper from '@/utils/EventHelper';

import { MenuStyled } from './styled';

export const CONTEXT_MENU_FILE_ITEM_ID = 'CONTEXT_MENU_FILE_ITEM_ID';
export const CONTEXT_MENU_EVENT_EXPLORE = 'CONTEXT_MENU_EVENT_EXPLORE';

export type ContextMenuExploreEventData = {
  file?: FileExploreTreeType;
  type: ContextMenuFileExploreType | string;
};

export enum ContextMenuFileExploreType {
  RENAME = 'RENAME',
  DELETE = 'DELETE',
}

const ContextMenuFileItem = () => {
  const { t } = useTranslation();

  const handleItemClick = ({ id, props: itemProps }: ItemParams<{ file: FileExploreTreeType }>) => {
    EventHelper.dispatch<ContextMenuExploreEventData>(CONTEXT_MENU_EVENT_EXPLORE, {
      file: itemProps?.file,
      type: id ?? '',
    });
  };

  return (
    <MenuStyled id={CONTEXT_MENU_FILE_ITEM_ID}>
      <Item id={ContextMenuFileExploreType.RENAME} onClick={handleItemClick}>
        <LuPencil className="icon-action pencil-icon" size={12} />
        {t`rename`}
      </Item>
      <Item id={ContextMenuFileExploreType.DELETE} onClick={handleItemClick}>
        <LuTrash2 className="icon-action trash-icon" size={12} />
        {t`delete`}
      </Item>
    </MenuStyled>
  );
};

export default ContextMenuFileItem;
