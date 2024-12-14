import { MouseEventHandler } from 'react';
import { LuChevronDown, LuChevronRight, LuFilePlus2, LuFolderPlus } from 'react-icons/lu';
import { VscCollapseAll } from 'react-icons/vsc';
import { useTheme } from 'styled-components';

import Text from '@/components/Text';
import { addNewFile, EditorToggleFolder, selectFileSelected } from '@/pages/editor';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { FileType } from '@/types/FileManager';
import EventHelper, { EventKeys } from '@/utils/EventHelper';

import { WrapFileExploreActions, WrapIconStyled, WrapperLabelStyled } from './styled';
import { CollapseLabel, CollapseLabelType } from './types';

type Props = {
  expand?: boolean;
  data: CollapseLabel;
};

const CollapseItem = ({ data, expand }: Props) => {
  const { colors } = useTheme();

  const dispatch = useAppDispatch();
  const fileSelected = useAppSelector(selectFileSelected);

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    EventHelper.dispatch(EventKeys.EDITOR_FILE_EXPLORE_COLLAPSE_SMALL);
  };

  const handleAddNewFile: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (fileSelected) {
      EventHelper.dispatch<EditorToggleFolder>(EventKeys.EDITOR_COLLAPSE_FOLDER_TOGGLE, {
        open: true,
        file: fileSelected,
      });
    }
    dispatch(
      addNewFile({
        type: FileType.FILE,
      }),
    );
  };
  const handleAddNewFolder: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (fileSelected) {
      EventHelper.dispatch<EditorToggleFolder>(EventKeys.EDITOR_COLLAPSE_FOLDER_TOGGLE, {
        open: true,
        file: fileSelected,
      });
    }
    const payload = addNewFile({
      type: FileType.DIRECTORY,
    });
    dispatch(payload);
  };

  return (
    <WrapperLabelStyled>
      <div className="left">
        {expand ? (
          <LuChevronDown color={colors.neutral400} />
        ) : (
          <LuChevronRight color={colors.neutral400} />
        )}
        <Text fontSize="sm" color={colors.neutral400}>
          {data.title}
        </Text>
      </div>
      <div>
        {data.type === CollapseLabelType.FILE_EXPLORE && (
          <WrapFileExploreActions>
            <WrapIconStyled onClick={handleAddNewFile}>
              <LuFilePlus2 size={13} />
            </WrapIconStyled>
            <WrapIconStyled onClick={handleAddNewFolder}>
              <LuFolderPlus size={13} />
            </WrapIconStyled>
            <WrapIconStyled onClick={handleClick}>
              <VscCollapseAll size={16} />
            </WrapIconStyled>
          </WrapFileExploreActions>
        )}
      </div>
    </WrapperLabelStyled>
  );
};

export default CollapseItem;
