import InternalLink from '@/components/InternalLink';
import { AppRoutes } from '@/constants/AppRoutes';

import AvatarHeader from './AvatarHeader';
import { HeaderContainerStyled } from './styled.header';

const MainHeader = () => {
  return (
    <HeaderContainerStyled>
      <div className="inner-header">
        <div className="left">
          <InternalLink to={AppRoutes.ROOT} className="icon">
            <span className="text-icon">TP</span>
          </InternalLink>
        </div>
        <div className="right">
          <AvatarHeader />
        </div>
      </div>
    </HeaderContainerStyled>
  );
};

export default MainHeader;
