import styled from 'styled-components';

import Button from '@/components/Button';

export const WrapperButton = styled(Button).attrs({ variant: 'primary' })(({ theme }) => ({
  backgroundColor: theme.colors.wash50,
  padding: 10,
  borderRadius: 6,
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  gap: 4,
  color: theme.colors.white,
}));
