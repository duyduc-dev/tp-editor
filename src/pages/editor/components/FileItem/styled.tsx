import styled from 'styled-components';

import Text from '@/components/Text';
import { StyledComponentProps } from '@/theme/types';
import { FileType } from '@/types/FileManager';
import { hexToRgba, isStringValid } from '@/utils/helper';

export const WrapperFileItemStyled = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  flex: 1,
  height: '100%',
}));

type WrapperFileNameStyledProps = StyledComponentProps<{
  depth: number;
  fileType: FileType;
  isSelected: boolean;
}>;

export const WrapperFileNameStyled = styled.button<WrapperFileNameStyledProps>(
  ({ theme, $depth, $fileType, $isSelected: isSelected, disabled }) => ({
    backgroundColor: isSelected ? theme.colors.arsenic : 'transparent',
    outline: 'none',
    width: '100%',
    textAlign: 'left',
    color: theme.colors.white,
    border: 'none',
    height: 22,
    cursor: 'pointer',
    paddingLeft: 10 * ($depth + 1) + ($fileType === FileType.FILE ? 16 : 0),
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    opacity: disabled ? 0.4 : 1,

    '&:hover': {
      backgroundColor: isSelected
        ? theme.colors.arsenic
        : disabled
          ? 'transparent'
          : hexToRgba(theme.colors.neutral600, 0.1),
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: '100%',
      zIndex: 999,
      display: 'block',
      width: 5,
      backgroundColor: isSelected ? theme.colors.arsenic : 'transparent',
    },

    '&:hover::before': {
      backgroundColor: isSelected
        ? theme.colors.arsenic
        : disabled
          ? 'transparent'
          : hexToRgba(theme.colors.neutral600, 0.1),
    },

    [`&:hover .${WrapperActionsStyled.styledComponentId}`]: {
      display: 'flex',
    },
  }),
);

export const TextStyled = styled(Text).attrs(({ theme }) => ({
  fontSize: 'sm',
  fontFamily: 'InterLight',
  color: theme.colors.neutral300,
}))(() => ({
  userSelect: 'none',
}));

export const WrapperActionsStyled = styled.div`
  display: none;
  align-items: center;
  gap: 8px;

  .icon-action {
    color: ${(p) => p.theme.colors.neutral300};

    &:hover {
      color: ${(p) => p.theme.colors.neutral100};
    }
  }
`;

type InputRenameStyledProps = StyledComponentProps<{
  disableError?: boolean;
}>;
export const InputRenameStyled = styled.input.attrs({
  autoComplete: 'off',
  spellCheck: 'false',
})<InputRenameStyledProps>(({ theme, value, $disableError: disableError }) => ({
  outline: 'none',
  border: '1px solid ',
  borderColor:
    disableError || isStringValid(String(value)) ? theme.colors.neutral500 : theme.colors.error600,
  backgroundColor: 'transparent',
  color: theme.colors.neutral100,
  fontSize: theme.fontSize.sm,
  fontFamily: theme.fontFamily.InterLight,
  height: '100%',
  padding: '0 4px',
  width: '100%',
}));

export const WrapperInputRenameStyled = styled.div<InputRenameStyledProps>(
  ({ theme, 'aria-label': label, $disableError: disableError }) => ({
    height: '100%',
    width: '100%',
    position: 'relative',

    '&::before': {
      content: 'attr(data-value-error)',
      display: disableError || isStringValid(label) ? 'none' : 'block',
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      color: theme.colors.neutral200,
      backgroundColor: theme.colors.error950,
      padding: '6px 6px',
      border: '1px solid',
      borderColor: theme.colors.error500,
      zIndex: 999,
      fontSize: theme.fontSize.sm,
      fontFamily: theme.fontFamily.InterLight,
    },
  }),
);
