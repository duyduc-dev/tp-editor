import styled from 'styled-components';

import { StyledComponentProps } from '@/theme/types';

type StyledWrapperProps = StyledComponentProps<{
  isOpen: boolean;
  backgroundColor?: string;
}>;

export const WrapperStyled = styled.div<StyledWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s linear;
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
`;

export const ContentStyled = styled.div<StyledWrapperProps>(
  ({ $isOpen, $backgroundColor, theme }) => ({
    minWidth: 240,
    backgroundColor: $backgroundColor ?? theme.colors.wash50,
    padding: 10,
    borderRadius: 6,
    transition: 'all 0.2s linear',
    transform: $isOpen ? 'translateY(0)' : 'translateY(20px)',
    opacity: $isOpen ? 1 : 0,
    zIndex: 9999999,
  }),
);

export const OverlayStyled = styled.div<StyledWrapperProps>(({ $isOpen }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.3)',
  visibility: $isOpen ? 'visible' : 'hidden',
  opacity: $isOpen ? 1 : 0,
  transition: `visibility 0.2s, opacity 0.2s linear`,
}));
