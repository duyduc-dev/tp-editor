import styled from 'styled-components';

import { StyledComponentProps } from '@/theme/types';
import { select } from '@/utils/helper';

import { ButtonVariant, RippleContainerProps } from './types';

type Props = StyledComponentProps<{
  variant?: ButtonVariant;
}>;

export const ButtonStyled = styled.button<Props>(({ $variant = 'default', theme }) => ({
  height: '36px',

  backgroundColor: select($variant, {
    _default: 'transparent',
    default: 'transparent',
    primary: theme.colors.neutral0,
    secondary: theme.colors.primary500,
  }),
  color: select($variant, {
    _default: theme.colors.textColor,
    default: theme.colors.textColor,
    primary: theme.colors.black,
    secondary: theme.colors.white,
  }),
  position: 'relative',
  padding: '8px 12px',
  overflow: 'hidden',
  borderRadius: '6px',
  transition: 'all 0.1s linear',
  border: ' 1px solid transparent',
  outline: 'none',
  cursor: 'pointer',
  fontFamily: `Inter-SemiBold, sans-serif`,
  fontSize: '14px',
  '&:hover':
    $variant === 'default'
      ? {
          backgroundColor: 'rgba(255,255,255,0.1)',
        }
      : {},
}));

export const RippleContainer = styled.div<StyledComponentProps<RippleContainerProps>>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  span {
    transform: scale(0);
    border-radius: 100%;
    position: absolute;
    background-color: ${(props) => props.$color};
    animation-name: ripple;
    animation-duration: ${(props) => props.$duration}ms;
  }

  @keyframes ripple {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }
`;
