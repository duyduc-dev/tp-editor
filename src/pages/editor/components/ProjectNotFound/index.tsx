import { forwardRef, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';

import Button from '@/components/Button';
import { ModalRef } from '@/components/Modal';
import Text from '@/components/Text';
import { mergeRefs } from '@/utils/helper';

import { WrapperModalStyled } from './styled';

const ProjectNotFoundModal = forwardRef<ModalRef>((_, ref) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigate = useNavigate();

  const innerRef = useRef<ModalRef>(null);

  const [isLoadingCancel, setIsLoadingCancel] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  const handleClickCreate = () => {
    setIsLoadingCreate(true);
    setTimeout(() => {
      innerRef.current?.close();
      navigate('/');
      setIsLoadingCreate(false);
    }, 1000);
  };

  const handleCancel = () => {
    setIsLoadingCancel(true);
    setTimeout(() => {
      innerRef.current?.close();
      navigate('/');
      setIsLoadingCancel(false);
    }, 1000);
  };

  return (
    <WrapperModalStyled hiddenOnClickOverlay={false} ref={mergeRefs(innerRef, ref)}>
      <Text
        fontSize="xxxl"
        fontFamily="InterBlack"
        className="text-404"
        css={{ marginTop: 24, marginBottom: 24 }}
      >
        404
      </Text>
      <Text fontSize="xm" fontFamily="InterBold">{t`projectNotFound`}</Text>
      <Text fontSize="sm" fontFamily="InterLight" color={colors.neutral300} css={{ marginTop: 16 }}>
        {t`weCannotFindYourProject`}
      </Text>
      <Text fontSize="sm" fontFamily="InterLight" color={colors.neutral300} css={{ marginTop: 4 }}>
        {t`uCanCreateNewOne`}
      </Text>
      <Button
        loading={isLoadingCreate}
        onClick={handleClickCreate}
        className="createNewProject"
        variant="secondary"
      >
        {t`createNewProject`}
      </Button>
      <Button loading={isLoadingCancel} onClick={handleCancel} className="cancel">
        {t`cancel`}
      </Button>
    </WrapperModalStyled>
  );
});

ProjectNotFoundModal.displayName = 'ProjectNotFoundModal';

export default ProjectNotFoundModal;
