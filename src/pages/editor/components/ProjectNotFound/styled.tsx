import styled from 'styled-components';

import Modal from '@/components/Modal';

export const WrapperModalStyled = styled(Modal).attrs({
  contentClassName: 'content-modal',
})(({ theme }) => ({
  '.content-modal': {
    backgroundColor: theme.colors.wash75,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  },

  '.text-404': {
    textAlign: 'center',
    color: theme.colors.primary400,
  },

  '.createNewProject': {
    marginTop: 20,
    marginBottom: 8,
  },
}));
