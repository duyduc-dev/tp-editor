import { authRouter } from '@authRemote/entry';
import { Suspense } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import PuffLoader from '@/components/Loading/PuffLoader';
import { AppRoutes } from '@/constants/AppRoutes';
import MainLayout from '@/layouts/MainLayout';
import RootLayout from '@/layouts/RootLayout';

import { editorRoutes } from './editor';
import HomePage from './home/HomePage';

const router = createBrowserRouter([
  {
    path: AppRoutes.ROOT,
    element: (
      <RootLayout>
        <Outlet />
      </RootLayout>
    ),
    children: [
      {
        path: AppRoutes.ROOT,
        element: (
          <MainLayout>
            <Outlet></Outlet>
          </MainLayout>
        ),
        children: [
          {
            path: AppRoutes.ROOT,
            element: <HomePage />,
          },
        ],
      },
      ...editorRoutes,
      {
        path: AppRoutes.ROOT,
        element: (
          <Suspense fallback={<PuffLoader />}>
            <Outlet></Outlet>
          </Suspense>
        ),
        children: [...authRouter],
      },
    ],
  },
]);

const RootRouterProvider = () => <RouterProvider router={router} />;

export default RootRouterProvider;
