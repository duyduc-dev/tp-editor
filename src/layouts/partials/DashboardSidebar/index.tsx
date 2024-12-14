import HeadSidebar from './HeadSidebar';
import ListNavigate from './ListNavigate';
import { WrapperStyled } from './styled';

const DashboardSidebar = () => {
  return (
    <WrapperStyled>
      <div>
        <HeadSidebar />
        <ListNavigate />
      </div>
    </WrapperStyled>
  );
};

export default DashboardSidebar;
