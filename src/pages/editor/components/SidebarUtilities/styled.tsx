import styled from 'styled-components';

import { StyledComponentProps } from '@/theme/types';

type Props = StyledComponentProps<{
  isOpen: boolean;
}>;

export const WrapperSidebarStyled = styled.div<Props>(({ theme, $isOpen: isOpen }) => ({
  backgroundColor: theme.colors.wash,
  minWidth: 100,
  width: 280,
  // overflowX: 'hidden',
  display: isOpen ? 'block' : 'none',
}));
