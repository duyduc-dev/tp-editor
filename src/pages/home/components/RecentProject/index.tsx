import { useAuthStore } from '@authRemote/entry';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import ProjectApi from '@/apis/ProjectApi';
import Text from '@/components/Text';
import { ProjectResponse } from '@/types/project';

import ProjectCardItem from '../ProjectCardItem';
import { WrapperProjectList, WrapperStyled } from './styled';

const RecentProject = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { userDetail } = useAuthStore();

  const [projects, setProjects] = useState<ProjectResponse[]>([]);

  useEffect(() => {
    ProjectApi.getProjects({ userId: userDetail?.id }).then((res) => {
      setProjects(res.content);
    });
  }, [userDetail]);

  return (
    <WrapperStyled>
      <Text fontSize="md" fontFamily="InterBold" color={colors.neutral300}>
        {t`recentProjects`}
      </Text>
      <WrapperProjectList>
        {projects.map((item) => (
          <ProjectCardItem key={item.id} data={item} />
        ))}
      </WrapperProjectList>
    </WrapperStyled>
  );
};

export default RecentProject;
