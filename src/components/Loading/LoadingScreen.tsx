import styled from 'styled-components';

import PuffLoader from '@/components/Loading/PuffLoader.tsx';
import useAppLayout from '@/hooks/useAppLayout';
import { StyledComponentProps } from '@/theme/types';

type StyledProps = {
  isLoading: boolean;
};

const WrapperLoadingStyled = styled.div<StyledComponentProps<StyledProps>>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.2s linear;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.$isLoading ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`;

const LoadingScreen = () => {
  const { isLoadingScreen } = useAppLayout();

  return (
    <WrapperLoadingStyled $isLoading={isLoadingScreen}>
      <PuffLoader size={50} />
    </WrapperLoadingStyled>
  );
};

export default LoadingScreen;
