import useEditorLayoutStore from '../../store/useEditorLayoutStore';
import { SideBarEditorType } from '../../types';
import SidebarExplore from '../SideBarExplore';
import { WrapperSidebarStyled } from './styled';

const SidebarUtilities = () => {
  const { sidebarOpenType } = useEditorLayoutStore();
  return (
    <WrapperSidebarStyled $isOpen={sidebarOpenType !== null}>
      <SidebarExplore visible={sidebarOpenType === SideBarEditorType.FILES_EXPLORE} />
    </WrapperSidebarStyled>
  );
};

export default SidebarUtilities;
