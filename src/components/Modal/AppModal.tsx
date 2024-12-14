import { forwardRef, useImperativeHandle, useState } from 'react';

import { sleep } from '@/utils/helper';

import { ContentStyled, OverlayStyled, WrapperStyled } from './styled';
import { ModalProps, ModalRef } from './types';

const AppModal = forwardRef<ModalRef, ModalProps>((props, ref) => {
  const {
    children,
    hiddenOnClickOverlay = true,
    backgroundColorContent,
    overlayClassName,
    contentClassName,
    className,
    onOpen,
    onClose,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = async () => {
    onClose?.();
    setIsVisible(false);
    await sleep(200);
    setIsOpen(false);
  };
  const handleOpen = async () => {
    onOpen?.();
    setIsOpen(true);
    requestIdleCallback(() => setIsVisible(true));
  };

  useImperativeHandle(ref, () => ({
    close: handleClose,
    open: handleOpen,
  }));

  if (!isOpen) return <></>;

  return (
    <WrapperStyled $isOpen={isVisible} className={className}>
      <OverlayStyled
        className={overlayClassName}
        $isOpen={isVisible}
        onClick={hiddenOnClickOverlay ? handleClose : undefined}
      />
      <ContentStyled
        className={contentClassName}
        $isOpen={isVisible}
        $backgroundColor={backgroundColorContent}
      >
        {children}
      </ContentStyled>
    </WrapperStyled>
  );
});

AppModal.displayName = 'AppModal';

export default AppModal;
