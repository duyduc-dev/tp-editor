import styled from 'styled-components';

import Button from '@/components/Button';

export const EditorHeaderStyled = styled.header(({ theme: { colors } }) => ({
  height: 40,
  backgroundColor: colors.wash50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: 8,
}));

export const WrapperSidebarStyled = styled.aside(({ theme: { colors } }) => ({
  width: 48,
  minWidth: 48,
  height: 'calc(100vh - 40px)',
  backgroundColor: colors.wash50,
}));

export const ContainerBody = styled.div`
  display: flex;
  flex: 1;
`;

export const ButtonSidebarStyled = styled(Button)`
  border-radius: 0px;
  height: 48px;
  width: 100%;
  padding-left: 0%;
  padding-right: 0%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: transparent;
  }
`;

export const WrapperHeaderLeftStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SaveWrapperStyled = styled(Button)`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding-left: 6px;
  padding-right: 6px;
`;
