import styled from 'styled-components';

export const WrapperStyled = styled.div(({ theme }) => ({
  padding: '16px',
  backgroundColor: theme.colors.wash,
  border: '1px solid transparent',
  borderRadius: 4,
  transition: 'all linear 0.1s',
  cursor: 'pointer',

  '&:hover': {
    borderColor: theme.colors.neutral700,
  },
}));

export const WrapperTitleStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;
