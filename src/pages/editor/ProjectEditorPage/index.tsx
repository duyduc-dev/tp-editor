import Split from '@uiw/react-split';
import { useAsync } from 'hooks-react-custom';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import ProjectApi from '@/apis/ProjectApi';
import FileExplore from '@/classes/FileExplore';
import LineBarSplit from '@/components/LineBarSplit';
import { ModalRef } from '@/components/Modal';
import useAppLayout from '@/hooks/useAppLayout';
import { HttpResponse, HttpStatusCode } from '@/http/types';
import { useAppDispatch } from '@/stores/hooks';
import EventHelper from '@/utils/EventHelper';

import CodeEditorView from '../components/CodeEditorView';
import EditorPreview from '../components/EditorPreview';
import ProjectNotFoundModal from '../components/ProjectNotFound';
import SidebarUtilities from '../components/SidebarUtilities';
import { clearEditorData, setProjectDetail } from '../slice';
import useEditorLayoutStore from '../store/useEditorLayoutStore';
import { LineBarSplitSidebarStyled } from './styled';

const ProjectEditorPage = () => {
  const { projectId } = useParams();

  const modalNotFoundRef = useRef<ModalRef>(null);

  const { sidebarOpenType } = useEditorLayoutStore();
  const { setLoadingScreen } = useAppLayout();
  const dispatch = useAppDispatch();

  const { execute } = useAsync(async () => {
    try {
      if (!projectId) {
        modalNotFoundRef.current?.open();
        return;
      }
      dispatch(clearEditorData());
      setLoadingScreen(true);
      const data = await ProjectApi.getProjectBySlug(projectId);
      dispatch(setProjectDetail(data));
      setLoadingScreen(false);
      EventHelper.dispatch('terminal:load', new FileExplore(data.fileExplore));
    } catch (error) {
      const err = error as HttpResponse;
      if (err.status === HttpStatusCode.NOT_FOUND) {
        modalNotFoundRef.current?.open();
      }
      dispatch(setProjectDetail(null));
      setLoadingScreen(false);
    }
  });

  useEffect(() => {
    execute();
  }, []);

  return (
    <Split
      visible={sidebarOpenType !== null}
      tabIndex={-1}
      renderBar={(p) => <LineBarSplitSidebarStyled {...p} />}
    >
      <SidebarUtilities />
      <Split style={{ flex: 1, outline: 0 }} tabIndex={-1} renderBar={LineBarSplit}>
        <CodeEditorView />
        <EditorPreview />
      </Split>
      <ProjectNotFoundModal ref={modalNotFoundRef} />
    </Split>
  );
};

export default ProjectEditorPage;
