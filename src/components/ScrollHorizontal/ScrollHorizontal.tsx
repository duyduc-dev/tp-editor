import { Children, ReactNode } from 'react';

import useHorizontalScroll from '@/hooks/useHorizontalScroll';

import { WrapperStyledHorizontal } from './styled';

type Props = {
  children?: ReactNode;
  className?: string;
};

const ScrollHorizontal = ({ children, className }: Props) => {
  const containerRef = useHorizontalScroll<HTMLDivElement>();

  return (
    <WrapperStyledHorizontal ref={containerRef} className={className}>
      {Children.map(children, (item) => item)}
    </WrapperStyledHorizontal>
  );
};

export default ScrollHorizontal;
