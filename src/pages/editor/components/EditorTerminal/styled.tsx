import styled from 'styled-components';

import LineBarSplit from '@/components/LineBarSplit';

export const WrapperTerminalStyled = styled.div(({ theme }) => ({
  position: 'relative',
  height: 300,
  minHeight: 28,
  overflow: 'hidden',
  backgroundColor: theme.colors.wash100,
}));

export const LineBarSplitStyled = styled(LineBarSplit)(({ theme }) => ({
  backgroundColor: theme.colors.wash100,
  '&::before': {
    content: '',
    border: 'none !important',
    outline: 'none !important',
    height: '1px !important',
    width: '100% !important',
    display: 'block',
    backgroundColor: theme.colors.wash,
    margin: '0 !important',
    boxShadow: 'none !important',
  },
}));

export const TerminalContainerStyled = styled.div(() => ({
  height: '100%',
}));
