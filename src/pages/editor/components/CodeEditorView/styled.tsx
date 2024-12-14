import styled from 'styled-components';

import Button from '@/components/Button';
import ScrollHorizontal from '@/components/ScrollHorizontal';
import { StyledComponentProps } from '@/theme/types';
import { FileExploreTreeType } from '@/types/FileManager';
import { hexToRgba } from '@/utils/helper';

export const WrapperStyled = styled.div(() => ({
  flex: 1,
  minWidth: 100,
}));

export const WrapperTextEditorStyled = styled.div(() => ({
  height: '50%',
  minHeight: 100,
  maxHeight: '90vh',
}));

export const WrapperTabStyled = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.wash,
  height: 42,
  minHeight: 42,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  overflowX: 'hidden',
}));

export const ContainerScrollStyled = styled(ScrollHorizontal)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  maxWidth: '100%',
  scrollBehavior: 'smooth',
  transition: 'all 0.1s linear',

  '&::-webkit-scrollbar': {
    borderRadius: 0,
    height: 4,
    backgroundColor: theme.colors.wash,
  },

  '&::-webkit-scrollbar-thumb': {
    borderRadius: 4,
    backgroundColor: hexToRgba(theme.colors.arsenic, 0.5),
    transition: 'all 0.1s linear',
    '&:hover': {
      backgroundColor: theme.colors.arsenic,
    },
  },
}));

type Props = StyledComponentProps<{
  currentTab: FileExploreTreeType;
  fileSelected: FileExploreTreeType | null;
}>;

export const WrapperTabItemStyled = styled.div<Props>(
  ({ theme, $currentTab: currentTab, $fileSelected: fileSelected }) => {
    return {
      borderTop: '2px solid ' + theme.colors.primary500,
      width: 'fit-content',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      outline: 'none',
      gap: 6,
      backgroundColor:
        currentTab.id === fileSelected?.id ? theme.colors.wash100 : theme.colors.wash,
      padding: '0 8px',
      cursor: 'pointer',
      userSelect: 'none',

      [WrapperCloseTabIconStyled]: {
        opacity: currentTab.id !== fileSelected?.id ? 0 : 1,
      },

      [`&:hover ${WrapperCloseTabIconStyled}`]: {
        opacity: 1,
      },
    };
  },
);
export const WrapNoFileSelectedStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const WrapperCloseTabIconStyled = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const ButtonTabActionStyled = styled(Button)(() => ({
  padding: 4,
  height: 'auto',
}));
