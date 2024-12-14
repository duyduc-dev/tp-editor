import { useTranslation } from 'react-i18next';
import { VscFiles, VscSearch, VscSettings } from 'react-icons/vsc';
import { useTheme } from 'styled-components';

import ListRender from '@/components/ListRender';
import TooltipStyled from '@/components/Tooltip';
import useEditorLayoutStore from '@/pages/editor/store/useEditorLayoutStore';
import { SideBarEditorType } from '@/pages/editor/types';

import { ButtonSidebarStyled, WrapperSidebarStyled } from './styled';

const EditorSidebar = () => {
  const { t } = useTranslation();
  const { sidebarOpenType, setSideBarOpenType } = useEditorLayoutStore();

  const { colors } = useTheme();

  const listNav = [
    {
      title: 'files',
      icon: <VscFiles size={20} color={getColorIcon(SideBarEditorType.FILES_EXPLORE)}></VscFiles>,
      type: SideBarEditorType.FILES_EXPLORE,
    },
    {
      title: 'search',
      icon: <VscSearch size={20} color={getColorIcon(SideBarEditorType.SEARCH)}></VscSearch>,
      type: SideBarEditorType.SEARCH,
    },
    {
      title: 'settings',
      icon: <VscSettings size={20} color={getColorIcon(SideBarEditorType.SETTINGS)}></VscSettings>,
      type: SideBarEditorType.SETTINGS,
    },
  ];

  function getColorIcon(type: SideBarEditorType) {
    return type === sidebarOpenType ? colors.white : colors.neutral500;
  }

  const handleClickSidebar = (type: SideBarEditorType) => {
    setSideBarOpenType(type === sidebarOpenType ? null : type);
  };

  return (
    <WrapperSidebarStyled>
      <ListRender
        data={listNav}
        renderItem={(item) => (
          <ButtonSidebarStyled
            rippleAnimation={false}
            onClick={() => handleClickSidebar(item.type)}
            data-tooltip-id="tool-sidebar"
            data-tooltip-content={t(item.title)}
          >
            {item.icon}
          </ButtonSidebarStyled>
        )}
      />
      <TooltipStyled id="tool-sidebar" />
    </WrapperSidebarStyled>
  );
};

export default EditorSidebar;
