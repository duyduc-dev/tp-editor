import { ReactNode } from 'react';
import styled, {
  type CSSObject,
  type ThemeFontFamilyKeys,
  type ThemeFontSizeKeys,
} from 'styled-components';

import { StyledComponentProps } from '@/theme/types';

type StyledProps = StyledComponentProps<{
  fontSize?: ThemeFontSizeKeys;
  fontFamily?: ThemeFontFamilyKeys;
  color?: string;
  css?: CSSObject;
}>;

const TextStyled = styled.span<StyledProps>(
  ({ theme, $fontSize = 'md', $fontFamily = 'InterRegular', $color, $css }) => ({
    fontSize: theme.getFontSizeByKeys($fontSize),
    fontFamily: `${theme.getFontFamilyByKeys($fontFamily)}, sans-serif`,
    color: $color,
    ...$css,
  }),
);

type Props = {
  className?: string;
  children?: ReactNode;
  fontSize?: ThemeFontSizeKeys;
  fontFamily?: ThemeFontFamilyKeys;
  color?: string;
  css?: CSSObject;
};

const Text = (props: Props) => {
  const { children, fontSize, fontFamily, color, css, ..._props } = props;
  return (
    <TextStyled $fontSize={fontSize} $fontFamily={fontFamily} $color={color} $css={css} {..._props}>
      {children}
    </TextStyled>
  );
};

export default Text;
