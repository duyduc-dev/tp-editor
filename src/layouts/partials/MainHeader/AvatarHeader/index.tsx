import { useAuthStore } from '@authRemote/entry';
import { useTranslation } from 'react-i18next';
import { IoMdSettings } from 'react-icons/io';
import { RiPlantLine } from 'react-icons/ri';
import { VscSignOut } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';

import Avatar from '@/components/Avatar';
import Popover, { usePopoverRef } from '@/components/Popover';
import Text from '@/components/Text';

import {
  SeparateStyled,
  WrapperAvatarStyled,
  WrapperItemOptionStyled,
  WrapperPopoverContentStyled,
  WrapperTitleStyled,
} from './styled';

const PopoverContent = () => {
  const { userDetail, logout } = useAuthStore();
  const { colors } = useTheme();

  const { t } = useTranslation();

  const data = [
    {
      icon: <RiPlantLine size={18} />,
      title: t`plan`,
      link: '/plan',
    },
    {
      icon: <Avatar size={18} />,
      title: t`yourProfile`,
      link: `/user/${userDetail?.username}`,
    },
    {
      icon: <IoMdSettings size={18} />,
      title: t`yourSettings`,
      link: `/settings`,
    },
  ];

  return (
    <WrapperPopoverContentStyled>
      <WrapperAvatarStyled>
        <Avatar size={52} src={userDetail?.profileImage} />
      </WrapperAvatarStyled>
      <WrapperTitleStyled>
        <Text fontFamily="InterMedium">
          {userDetail?.firstName} {userDetail?.lastName}
        </Text>
        <Text fontSize="sm" fontFamily="InterLight" color={colors.neutral300}>
          {userDetail?.username}
        </Text>
      </WrapperTitleStyled>
      <SeparateStyled />
      {data.map((item) => (
        <WrapperItemOptionStyled to={item.link} as={Link} key={item.title}>
          {item.icon}
          {item.title}
        </WrapperItemOptionStyled>
      ))}
      <SeparateStyled />
      <WrapperItemOptionStyled onClick={logout}>
        <VscSignOut size={18} />
        {t`signOut`}
      </WrapperItemOptionStyled>
    </WrapperPopoverContentStyled>
  );
};

const AvatarHeader = () => {
  const popoverRef = usePopoverRef();
  return (
    <Popover
      placement="bottom-end"
      onClickOutside={() => popoverRef.current?.close()}
      ref={popoverRef}
      render={() => <PopoverContent />}
    >
      <Avatar onClick={() => popoverRef.current?.toggle()} size={24} />
    </Popover>
  );
};

export default AvatarHeader;
