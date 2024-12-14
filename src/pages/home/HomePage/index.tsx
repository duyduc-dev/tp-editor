import { useAuthStore } from '@authRemote/entry';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@/constants/AppRoutes';

import NewProject from '../components/NewProject';
import RecentProject from '../components/RecentProject';

const HomePage = () => {
  const { authDetail } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authDetail) {
      navigate(AppRoutes.AUTH + '/login');
    }
  }, [authDetail]);

  return (
    <div>
      <NewProject />
      <RecentProject />
    </div>
  );
};

export default HomePage;
