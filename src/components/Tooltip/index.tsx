import { Tooltip } from 'react-tooltip';
import styled from 'styled-components';

const TooltipStyled = styled(Tooltip).attrs({
  delayShow: 500,
  opacity: 1,
})(({ theme }) => ({
  backgroundColor: `${theme.colors.wash50} !important`,
  fontFamily: theme.fontFamily.InterRegular,
  borderRadius: `4px !important`,
  fontSize: `${theme.fontSize.sm}px !important`,
}));

export default TooltipStyled;
