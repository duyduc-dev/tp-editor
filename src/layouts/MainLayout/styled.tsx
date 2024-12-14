import styled, { css } from 'styled-components';

const baseCss = css`
  flex: 1;
`;

export const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
`;

export const WrapperBody = styled.div`
  ${baseCss}
  display: flex;
`;

export const WrapperChild = styled.div`
  ${baseCss}
  padding: 32px;
`;
