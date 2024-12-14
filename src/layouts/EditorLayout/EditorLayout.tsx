import { PropsWithChildren } from 'react';

import Box from '@/components/CommonStyled/Box';

import { WrapperStyled } from '../MainLayout/styled';
import EditorHeader from './EditorHeader';
import EditorSidebar from './EditorSidebar';
import { ContainerBody } from './styled';

const EditorLayout = ({ children }: PropsWithChildren) => {
  return (
    <WrapperStyled>
      <EditorHeader />
      <ContainerBody tabIndex={-1}>
        <EditorSidebar />
        <Box $css={{ flex: 1 }}>{children}</Box>
      </ContainerBody>
    </WrapperStyled>
  );
};

export default EditorLayout;
