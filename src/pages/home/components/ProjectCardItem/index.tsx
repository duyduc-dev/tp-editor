import { DiReact } from 'react-icons/di';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';

import Text from '@/components/Text';
import { ProjectResponse } from '@/types/project';
import { limitString } from '@/utils/helper';

import { WrapperStyled, WrapperTitleStyled } from './styled';

type Props = {
  data: ProjectResponse;
};

const ProjectCardItem = (props: Props) => {
  const { data } = props;
  const { description, title, slug } = data;

  const { colors } = useTheme();
  const navigate = useNavigate();
  return (
    <WrapperStyled onClick={() => navigate(`/editor/${slug}`)}>
      <WrapperTitleStyled>
        <DiReact size={28} />
        <Text fontSize="sl" fontFamily="InterLight" color={colors.neutral200}>
          {title}
        </Text>
      </WrapperTitleStyled>
      <Text fontSize="sl" fontFamily="InterLight" color={colors.neutral400}>
        {limitString(description, 50)}
      </Text>
    </WrapperStyled>
  );
};

export default ProjectCardItem;
