import { useTranslation } from 'react-i18next';
import { LuSave } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';

import Box from '@/components/CommonStyled/Box';
import Text from '@/components/Text';
import { AppRoutes } from '@/constants/AppRoutes';

import AvatarHeader from '../partials/MainHeader/AvatarHeader';
import { EditorHeaderStyled, SaveWrapperStyled, WrapperHeaderLeftStyled } from './styled';

const EditorHeader = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigate = useNavigate();
  return (
    <EditorHeaderStyled>
      <WrapperHeaderLeftStyled>
        <Box
          onClick={() => {
            navigate(AppRoutes.ROOT);
          }}
          $width={48}
          $display="flex"
          $alignItems="center"
          $justifyContent="center"
          $height="100%"
          $css={{ cursor: 'pointer' }}
        >
          <Text fontFamily="InterBold">TP</Text>
        </Box>
        <SaveWrapperStyled>
          <LuSave size={18} color={colors.neutral300} />
          <Text fontSize="sm" fontFamily="InterMedium" color={colors.neutral300}>{t`save`}</Text>
        </SaveWrapperStyled>
      </WrapperHeaderLeftStyled>
      <AvatarHeader />
    </EditorHeaderStyled>
  );
};

export default EditorHeader;
