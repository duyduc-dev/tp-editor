import PuffLoader from '../Loading/PuffLoader';
import Ripple from './Ripple';
import { ButtonStyled } from './styled';
import { ButtonProps } from './types';

const AppButton = (props: ButtonProps) => {
  const {
    variant,
    rippleAnimation = true,
    rippleColor = '#ffffff80',
    rippleDuration = 1000,
    children,
    loading,
    ..._props
  } = props;
  return (
    <ButtonStyled $variant={variant} {..._props}>
      {!loading && children}
      {rippleAnimation && <Ripple color={rippleColor} duration={rippleDuration} />}
      {loading && <PuffLoader />}
    </ButtonStyled>
  );
};

export default AppButton;
