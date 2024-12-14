import { ReactNode } from 'react';

export type ModalProps = {
  children?: ReactNode;
  hiddenOnClickOverlay?: boolean;
  backgroundColorContent?: string;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  onOpen?: () => void;
  onClose?: () => void;
};

export type ModalRef = {
  open: () => void;
  close: () => void;
};
