import { PropsWithChildren, useEffect } from 'react';
import styled from 'styled-components';

const ContainerStyled = styled.div(({ theme: { colors } }) => ({
  color: colors.neutral0,
  backgroundColor: colors.wash100,
  minHeight: '100vh',
  maxHeight: '100vh',
  overflow: 'hidden',
  maxWidth: '100vw',
}));

const AppContainer = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    localStorage.setItem('app-type', 'editor');
  }, []);

  return <ContainerStyled>{children}</ContainerStyled>;
};

export default AppContainer;
