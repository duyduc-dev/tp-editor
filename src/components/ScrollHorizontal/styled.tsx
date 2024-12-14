import styled from 'styled-components';

export const WrapperStyledHorizontal = styled.div(() => ({
  userSelect: 'none',
  height: '100%',
  overflowX: 'auto',
  scrollBehavior: 'smooth',
  display: 'flex',
  transition: 'all 0.1s linear',
}));
