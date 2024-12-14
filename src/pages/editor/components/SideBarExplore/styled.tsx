import styled from 'styled-components';

export const WrapperExploreStyled = styled.div(() => ({}));

export const WrapFileExploreActions = styled.div`
  display: none;
  align-items: center;
  gap: 8px;
`;

export const WrapperLabelStyled = styled.div`
  background-color: ${(p) => p.theme.colors.wash50};
  padding: 4px 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  cursor: pointer;

  &::before {
    content: '';
    display: block;
    background-color: ${(p) => p.theme.colors.wash50};
    position: absolute;
    height: 100%;
    width: 5px;
    top: 0;
    bottom: 0;
    left: 100%;
    z-index: 9999;
    pointer-events: none;
  }

  .left {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &:hover .${WrapFileExploreActions.styledComponentId} {
    display: flex;
  }
`;

export const WrapIconStyled = styled.div(({ theme }) => ({
  color: theme.colors.neutral300,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    color: theme.colors.white,
  },
}));
