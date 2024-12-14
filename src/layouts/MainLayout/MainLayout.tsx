import { PropsWithChildren } from 'react';

import DashboardSidebar from '../partials/DashboardSidebar';
import MainHeader from '../partials/MainHeader';
import { WrapperBody, WrapperChild, WrapperStyled } from './styled';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <WrapperStyled>
      <MainHeader />
      <WrapperBody>
        <DashboardSidebar />
        <WrapperChild>{children}</WrapperChild>
      </WrapperBody>
    </WrapperStyled>
  );
};

export default MainLayout;
