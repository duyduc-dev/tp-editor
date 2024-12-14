import { type DefaultTheme, type ThemeFontFamily, type ThemeFontSize } from 'styled-components';

import { themeColors } from '@/theme/colors.ts';

export { themeColors };

const fontSize: ThemeFontSize = {
  sm: 13,
  sl: 14,
  ssl: 15,
  md: 16,
  xs: 18,
  xm: 20,
  xl: 24,
  xxl: 28,
  xxxl: 32,
};

const fontFamily: ThemeFontFamily = {
  InterBlack: 'Inter-Black',
  InterBlackItalic: 'Inter-BlackItalic',
  InterBold: 'Inter-Bold',
  InterBoldItalic: 'Inter-BoldItalic',
  InterExtraBold: 'Inter-ExtraBold',
  InterExtraBoldItalic: 'Inter-ExtraBoldItalic',
  InterExtraLight: 'Inter-ExtraLight',
  InterExtraLightItalic: 'Inter-ExtraLightItalic',
  InterItalic: 'Inter-Italic',
  InterLight: 'Inter-Light',
  InterLightItalic: 'Inter-LightItalic',
  InterMedium: 'Inter-Medium',
  InterMediumItalic: 'Inter-MediumItalic',
  InterRegular: 'Inter-Regular',
  InterSemiBold: 'Inter-SemiBold',
  InterSemiBoldItalic: 'Inter-SemiBoldItalic',
  InterThin: 'Inter-Thin',
  InterThinItalic: 'Inter-ThinItalic',
  InterV: 'Inter-V',
};

const theme: DefaultTheme = {
  colors: themeColors,
  spacing: {
    headerHeight: 44,
  },
  breakpoints: {
    sm: 240,
  },
  fontSize: fontSize,
  fontFamily: fontFamily,
  getFontSizeByKeys: (key) => fontSize[key],
  getFontFamilyByKeys: (key) => fontFamily[key],
};

export default theme;
