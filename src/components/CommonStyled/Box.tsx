import styled, { type CSSObject } from 'styled-components';

import { StyledComponentProps } from '@/theme/types';

type Props = {
  css?: CSSObject;
  display?: 'flex' | 'block' | 'none' | 'grid';
  alignItems?: 'center' | 'flex-end' | 'flex-start';
  justifyContent?: 'center' | 'flex-end' | 'flex-start';
  backgroundColor?: string;
  width?: number | string;
  height?: number | string;
  padding?: number | string;
  margin?: number | string;
};

const BoxStyled = styled.div<StyledComponentProps<Props>>(
  ({
    $css,
    $display,
    $alignItems,
    $backgroundColor,
    $justifyContent,
    $width,
    $height,
    $margin,
    $padding,
  }) => ({
    display: $display,
    alignItems: $alignItems,
    justifyContent: $justifyContent,
    backgroundColor: $backgroundColor,
    width: $width,
    height: $height,
    margin: $margin,
    padding: $padding,
    ...$css,
  }),
);

const Box = BoxStyled;

export default Box;
