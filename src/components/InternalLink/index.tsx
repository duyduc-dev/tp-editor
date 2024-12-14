import { Link } from 'react-router-dom';
import styled from 'styled-components';

const InternalLink = styled(Link)(({ theme: { colors } }) => ({
  color: colors.textColor,
  textDecoration: 'none',
}));

export default InternalLink;
