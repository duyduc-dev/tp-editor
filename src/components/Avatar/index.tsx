import { useIsomorphicLayoutEffect } from 'hooks-react-custom';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa6';
import styled from 'styled-components';

import { StyledComponentProps } from '@/theme/types';

type PropsStyle = StyledComponentProps<{
  size: number;
}>;

const WrapperAvatar = styled.div<PropsStyle>(({ $size, theme, onClick }) => ({
  borderRadius: '50%',
  width: $size,
  height: $size,
  minHeight: $size,
  maxHeight: $size,
  minWidth: $size,
  maxWidth: $size,
  backgroundColor: theme.colors.arsenic,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: onClick ? 'pointer' : 'auto',

  img: {
    borderRadius: '50%',
    objectFit: 'cover',
  },
}));

type Props = {
  size?: number;
  src?: string;
  iconSize?: number;
  onClick?: () => void;
};

const Avatar = ({ size = 32, iconSize, src, onClick }: Props) => {
  const [isError, setIsError] = useState(false);
  const [source, setSource] = useState(src);

  const handleError = () => setIsError(true);

  useIsomorphicLayoutEffect(() => {
    setSource(src);
    setIsError(false);
  }, [src]);

  return (
    <WrapperAvatar onClick={onClick} $size={size}>
      {source && !isError ? (
        <img src={source} alt="" onError={handleError} />
      ) : (
        <FaUser size={iconSize ?? size / 2} />
      )}
    </WrapperAvatar>
  );
};

export default Avatar;
