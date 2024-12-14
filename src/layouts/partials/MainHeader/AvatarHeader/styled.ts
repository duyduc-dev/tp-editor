import styled from 'styled-components';

export const WrapperPopoverContentStyled = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.wash50,
  paddingTop: 16,
  paddingBottom: 16,
  borderRadius: 4,
  color: theme.colors.white,
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  minWidth: 250,
}));

export const WrapperAvatarStyled = styled.div(() => ({
  display: 'flex',
  justifyContent: 'center',
}));

export const WrapperTitleStyled = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 12,
  gap: 4,
}));

export const SeparateStyled = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${(p) => p.theme.colors.neutral600};
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const WrapperItemOptionStyled = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: ${(p) => p.theme.fontSize.sm}px;
  font-family: ${(p) => p.theme.fontFamily.InterLight};
  color: ${(p) => p.theme.colors.neutral300};
  cursor: pointer;
  transition: all linear 0.1s;
  width: 100%;
  text-decoration: none;

  &:hover {
    color: ${(p) => p.theme.colors.neutral50};
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
