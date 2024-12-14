import { useAuthStore } from '@authRemote/entry';

import Avatar from '@/components/Avatar';
import Text from '@/components/Text';

import { WrapperHeadSidebar } from './styled';

const HeadSidebar = () => {
  const { userDetail } = useAuthStore();
  return (
    <WrapperHeadSidebar>
      <Avatar />
      <div>
        <Text fontSize="sm">
          {userDetail?.firstName} {userDetail?.lastName}
        </Text>
      </div>
    </WrapperHeadSidebar>
  );
};

export default HeadSidebar;
