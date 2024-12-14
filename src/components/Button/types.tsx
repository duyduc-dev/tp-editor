import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  rippleDuration?: number;
  rippleColor?: string;
  fullWidth?: boolean;
  rippleAnimation?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
}
export type ButtonVariant = 'default' | 'primary' | 'secondary';

export type RippleContainerProps = {
  color: string;
  duration: number;
};

export type RippleItemType = {
  x: number;
  y: number;
  size: number;
};
