import { Outlet, type RouteObject } from 'react-router-dom';

import { AppRoutes } from '@/constants/AppRoutes';
import EditorLayout from '@/layouts/EditorLayout';

import ProjectEditorPage from './ProjectEditorPage';

const editorRoutes: RouteObject[] = [
  {
    path: AppRoutes.EDITOR,
    element: (
      <EditorLayout>
        <Outlet />
      </EditorLayout>
    ),
    children: [
      {
        index: true,
        element: <ProjectEditorPage />,
      },
    ],
  },
];

export default editorRoutes;
