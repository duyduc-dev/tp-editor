import { useEventListener } from 'hooks-react-custom';
import { MouseEvent } from 'react';
import { LiaTimesSolid } from 'react-icons/lia';
import { SiPrettier } from 'react-icons/si';
import { useTheme } from 'styled-components';

import FileIcon from '@/components/FileIcon';
import Text from '@/components/Text';
import {
  closeTab,
  selectFileForceTab,
  selectFileOpening,
  selectTabEditor,
  setFileForceTab,
  setFileOpening,
} from '@/pages/editor';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { FileExploreTreeType } from '@/types/FileManager';
import EventHelper, { EventKeys } from '@/utils/EventHelper';

import {
  ButtonTabActionStyled,
  ContainerScrollStyled,
  WrapperCloseTabIconStyled,
  WrapperTabItemStyled,
  WrapperTabStyled,
} from './styled';

const TabEditor = () => {
  const dispatch = useAppDispatch();
  const fileForceTab = useAppSelector(selectFileForceTab);
  const tabEditor = useAppSelector(selectTabEditor);
  const fileOpening = useAppSelector(selectFileOpening);

  const { colors } = useTheme();

  const handleClickTab = (file: FileExploreTreeType) => {
    if (file.id !== fileOpening?.id) {
      dispatch(setFileOpening(file));
    }
  };

  const handleDoubleClickTab = (file: FileExploreTreeType) => {
    if (file.id === fileForceTab?.id) {
      dispatch(setFileForceTab(null));
    }
  };

  const handleClickCloseTab = (
    e: MouseEvent<SVGElement, globalThis.MouseEvent>,
    file: FileExploreTreeType,
  ) => {
    e.stopPropagation();
    dispatch(closeTab(file));
  };

  const handleFormatDocument = () => {
    EventHelper.dispatch(EventKeys.EDITOR_FORMAT_DOCUMENT);
  };

  useEventListener('beforeunload', (e) => {
    e.preventDefault();
    return (e.returnValue = 'Are you sure you want to close?');
  });

  return (
    <WrapperTabStyled>
      <ContainerScrollStyled>
        {tabEditor.map((item) => (
          <WrapperTabItemStyled
            key={`item-${item.id}`}
            onClick={() => handleClickTab(item)}
            onDoubleClick={() => handleDoubleClickTab(item)}
            $currentTab={item}
            $fileSelected={fileOpening}
          >
            <FileIcon fileName={item?.name}></FileIcon>
            <Text
              fontSize="sm"
              fontFamily={fileForceTab?.id === item.id ? 'InterLightItalic' : 'InterLight'}
              color={item.id === fileOpening?.id ? colors.white : colors.neutral500}
            >
              {item?.name}
            </Text>
            <WrapperCloseTabIconStyled>
              <LiaTimesSolid
                onClick={(e) => handleClickCloseTab(e, item)}
                size={14}
                color={colors.neutral500}
              />
            </WrapperCloseTabIconStyled>
          </WrapperTabItemStyled>
        ))}
      </ContainerScrollStyled>
      <div>
        <ButtonTabActionStyled onClick={handleFormatDocument}>
          <SiPrettier size={14} />
        </ButtonTabActionStyled>
      </div>
    </WrapperTabStyled>
  );
};

export default TabEditor;
