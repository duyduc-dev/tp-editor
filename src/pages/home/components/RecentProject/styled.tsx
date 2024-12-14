import styled from 'styled-components';

export const WrapperStyled = styled.div(() => ({
  marginTop: 24,
}));

export const WrapperProjectList = styled.div(() => ({
  marginTop: 24,
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  gap: 16,
}));
