import styled from 'styled-components';

import LineBarSplit from '@/components/LineBarSplit';

export const LineBarSplitSidebarStyled = styled(LineBarSplit)(({ theme }) => ({
  position: 'relative',
  '& .inner-line': {
    backgroundColor: `${theme.colors.wash} !important`,
  },
  '&:hover .inner-line': {
    backgroundColor: `${theme.colors.wash50} !important`,
  },

  '& .inner-line:before': {
    content: '""',
    display: 'block',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: -4,
    backgroundColor: 'transparent',
  },
}));
