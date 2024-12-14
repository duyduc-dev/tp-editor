import styled from 'styled-components';

import { FileType } from '@/types/FileManager';

import FileIconHelper from './helper';

type Props = {
  fileName?: string;
  size?: number;
  fileType?: FileType;
  isExpand?: boolean;
};

const WrapperFileIconStyled = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const FileIcon = ({ fileName, size, fileType, isExpand }: Props) => {
  return (
    <WrapperFileIconStyled>
      {FileIconHelper.getFileIcon(FileIconHelper.getKeyIcon(fileName, fileType, isExpand), size)}
    </WrapperFileIconStyled>
  );
};

export default FileIcon;
