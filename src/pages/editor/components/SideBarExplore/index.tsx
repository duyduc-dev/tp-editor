import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import Collapse from '@/components/Collapse';
import Box from '@/components/CommonStyled/Box';
import Text from '@/components/Text';

import FileTree from '../FileTree';
import CollapseItem from './CollapseItem';
import { WrapperExploreStyled } from './styled';
import { CollapseLabel, CollapseLabelType } from './types';

type Props = {
  visible?: boolean;
};

const SidebarExplore = ({ visible = true }: Props) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const data: CollapseLabel[] = [
    {
      title: t`files`,
      type: CollapseLabelType.FILE_EXPLORE,
    },
  ];

  return (
    <WrapperExploreStyled hidden={!visible}>
      <Box $padding="12px 8px">
        <Text fontSize="sm" color={colors.neutral400}>{t`explore`}</Text>
      </Box>
      <Collapse
        keyExtractor={(item) => `${item.title}-${item.type}`}
        data={data}
        defaultExpandIndex={[0]}
        renderLabel={({ item, isExpand }) => <CollapseItem data={item} expand={isExpand} />}
        renderContent={() => <FileTree />}
      />
    </WrapperExploreStyled>
  );
};

export default SidebarExplore;
