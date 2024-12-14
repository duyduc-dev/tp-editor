import { HTMLAttributes } from 'react';
import styled from 'styled-components';

const WrapperStyled = styled.div(({ theme }) => ({
  boxShadow: 'none !important',
  backgroundColor: 'transparent',
  border: 'none !important',
  borderWidth: 0,
  '&::before,&::after': {
    display: 'none',
  },
  '&:hover>div': {
    transition: 'all linear 0.3s',
    backgroundColor: theme.colors.wash50,
  },
}));

const LineBarSplit = (props: HTMLAttributes<HTMLDivElement>) => {
  const { onMouseDown } = props;

  return (
    <WrapperStyled {...props}>
      <div className="inner-line" role="presentation" onMouseDown={onMouseDown} />
    </WrapperStyled>
  );
};

export default LineBarSplit;
