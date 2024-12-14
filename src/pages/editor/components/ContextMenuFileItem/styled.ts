import { Menu } from 'react-contexify';
import styled from 'styled-components';

import { hexToRgba } from '@/utils/helper';

export const MenuStyled = styled(Menu)(({ theme }) => ({
  backgroundColor: theme.colors.wash50,
  zIndex: 999999,
  boxShadow: 'none',

  '.contexify_submenu-arrow': {},
  '.contexify_separator': {},

  '.contexify_item': {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '.contexify_itemContent': {
      width: '100%',
      gap: 6,

      color: theme.colors.neutral100,
      fontSize: theme.fontSize.sm,
      fontFamily: theme.fontFamily.InterLight,
      '&:hover': {
        backgroundColor: hexToRgba(theme.colors.arsenic),
      },
    },
  },
}));
