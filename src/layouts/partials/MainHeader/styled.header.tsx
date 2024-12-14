import styled from 'styled-components';

export const HeaderContainerStyled = styled.header`
  padding-left: 24px;
  padding-right: 24px;
  height: ${(p) => p.theme.spacing.headerHeight}px;
  background-color: ${(p) => p.theme.colors.wash50};
  box-shadow:
    0 1px 3px #0000001a,
    0 1px 2px #0000000f;
  -webkit-app-region: drag;
  z-index: 20;

  .inner-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .icon {
    color: ${(p) => p.theme.colors.white};
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    font-family: 'Inter-Bold';
    letter-spacing: 1.2px;
  }
`;
