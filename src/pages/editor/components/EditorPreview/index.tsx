import { useRef } from 'react';
import { useTheme } from 'styled-components';

import Box from '@/components/CommonStyled/Box';
import Text from '@/components/Text';
import { selectUrlHosting } from '@/pages/editor';
import { useAppSelector } from '@/stores/hooks';

import { WrapperStyled } from './styled';

const EditorPreview = () => {
  const urlHosting = useAppSelector(selectUrlHosting);
  const { colors } = useTheme();

  const iframeRef = useRef<HTMLIFrameElement>(null);
  return (
    <WrapperStyled>
      {urlHosting ? (
        <iframe
          title="url-preview"
          width="100%"
          ref={iframeRef}
          height="100%"
          src={urlHosting}
          frameBorder="0"
        ></iframe>
      ) : (
        <Box
          $css={{
            backgroundColor: colors.wash,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          $width="100%"
          $height="100%"
        >
          <Text fontSize="sm" fontFamily="InterSemiBold" color={colors.neutral500}>
            No content
          </Text>
        </Box>
      )}
      {/* <EditorConsole /> */}
    </WrapperStyled>
  );
};

export default EditorPreview;
