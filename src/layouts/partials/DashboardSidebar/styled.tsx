import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const WrapperStyled = styled.div`
  width: 240px;
  background-color: ${(p) => p.theme.colors.wash50};
  padding: 24px 10px;
`;

export const WrapperHeadSidebar = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export const NavLinkStyled = styled(NavLink)`
  width: 100%;
  padding: 12px 10px;
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 10px;
  transition: all 0.2s linear;
  border-radius: 4px;
  color: ${(p) => p.theme.colors.neutral300};

  &.active {
    color: ${(p) => p.theme.colors.neutral200};
    background-color: rgba(0, 0, 0, 0.2);
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
