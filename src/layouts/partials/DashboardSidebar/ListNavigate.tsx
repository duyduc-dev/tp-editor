import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { LuLayoutDashboard, LuPackage, LuSettings } from 'react-icons/lu';
import styled from 'styled-components';

import ListRender from '@/components/ListRender';
import Text from '@/components/Text';
import { AppRoutes } from '@/constants/AppRoutes';

import { NavLinkStyled } from './styled';

type Nav = {
  title: string;
  icon: ReactNode;
  link: string;
};

type Props = {
  className?: string;
};

const ListNavigate = ({ className }: Props) => {
  const { t } = useTranslation();

  const list: Nav[] = [
    {
      title: 'dashboard',
      icon: <LuLayoutDashboard size={16} />,
      link: AppRoutes.ROOT,
    },
    {
      title: 'projects',
      icon: <LuPackage size={16} />,
      link: '/projects',
    },
    {
      title: 'settings',
      icon: <LuSettings size={16} />,
      link: '/settings',
    },
  ];

  return (
    <ListRender
      containerClassName={className}
      itemClassName="itemClassName"
      data={list}
      renderItem={(item) => (
        <NavLinkStyled to={item.link}>
          {item.icon}
          <Text fontSize="ssl">{t(item.title)}</Text>
        </NavLinkStyled>
      )}
    />
  );
};

const ListNavigateStyled = styled(ListNavigate).withConfig({
  displayName: 'ListNavigateStyled',
})`
  margin-top: 12px;
  margin-bottom: 8px;

  .itemClassName {
    margin-bottom: 8px;
  }
`;

export default ListNavigateStyled;
