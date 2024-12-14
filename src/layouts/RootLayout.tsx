import { useAuthRemoteConfig } from '@authRemote/entry';
import { PropsWithChildren } from 'react';

const RootLayout = ({ children }: PropsWithChildren) => {
  useAuthRemoteConfig({
    onSuccess: () => {
      location.href = '/';
    },
  });
  return <>{children}</>;
};

export default RootLayout;
