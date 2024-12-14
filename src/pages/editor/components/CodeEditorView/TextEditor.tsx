import MonacoEditorReact, { BeforeMount, Monaco, OnChange, OnMount } from '@monaco-editor/react';
import { useKeyPressHandler } from 'hooks-react-custom';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import Box from '@/components/CommonStyled/Box';
import PuffLoader from '@/components/Loading/PuffLoader';
import Text from '@/components/Text';
import { EditorActionKey } from '@/constants/EditorActionKeys';
import useDebounceState from '@/hooks/useDebounceState';
import WebContainer from '@/libs/WebContainer';
import { selectFileForceTab, selectFileOpening, setFileForceTab } from '@/pages/editor';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import EventHelper, { EventKeys } from '@/utils/EventHelper';
import { getLanguageByExt } from '@/utils/helper';

import { WrapNoFileSelectedStyled, WrapperTextEditorStyled } from './styled';
import TabEditor from './TabEditor';

const TextEditor = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const fileOpening = useAppSelector(selectFileOpening);
  const fileForceTab = useAppSelector(selectFileForceTab);

  const editorRef = useRef<Parameters<OnMount>[0]>(null);
  const valuePrev = useRef(fileOpening?.content ?? '');
  const [valueDebounce, setDebounceValue] = useDebounceState(fileOpening?.content ?? '');

  const handleBeforeMount: BeforeMount = (monaco: Monaco) => {
    if (monaco) {
      monaco.editor.defineTheme('mytheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          {
            background: colors.wash100.replace(/#/g, ''),
            token: '',
          },
        ],
        colors: {
          'editor.background': colors.wash100,
        },
      });
    }
  };

  const handleEditorMount: OnMount = (editor) => {
    if (editor) {
      // @ts-ignore
      editorRef.current = editor;
    }
  };

  const handleChangeEditor: OnChange = (value) => {
    if (fileForceTab) {
      dispatch(setFileForceTab(null));
    }
    setDebounceValue(value ?? '');
  };

  useEffect(() => {
    return EventHelper.subscriber(EventKeys.EDITOR_FORMAT_DOCUMENT, () => {
      editorRef.current?.getAction(EditorActionKey.FORMAT_DOCUMENT)?.run();
    });
  }, []);

  useEffect(() => {
    if (fileOpening && valuePrev.current !== valueDebounce) {
      valuePrev.current = valueDebounce;
      WebContainer.writeFile('/project' + fileOpening?.path, valueDebounce);
    }
  }, [valueDebounce, fileOpening]);

  useKeyPressHandler('ctrl.s', (e) => {
    e.preventDefault();
    console.log('saved');
  });

  return (
    <WrapperTextEditorStyled>
      <Box
        $height="100%"
        $css={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TabEditor />
        {fileOpening ? (
          <>
            <MonacoEditorReact
              height="calc(100% - 38px)"
              width="100%"
              beforeMount={handleBeforeMount}
              onMount={handleEditorMount}
              theme="mytheme"
              onChange={handleChangeEditor}
              language={getLanguageByExt(fileOpening.name)}
              path={fileOpening.path}
              defaultValue={fileOpening.content}
              loading={<PuffLoader />}
              options={{
                showUnused: true,
                smoothScrolling: true,
              }}
            />
          </>
        ) : (
          <WrapNoFileSelectedStyled>
            <Text
              fontSize="sm"
              fontFamily="InterSemiBold"
              color={colors.neutral500}
            >{t`noFileSelected`}</Text>
          </WrapNoFileSelectedStyled>
        )}
      </Box>
    </WrapperTextEditorStyled>
  );
};

export default TextEditor;
