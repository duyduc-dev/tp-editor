import '@xterm/xterm/css/xterm.css';

import { CanvasAddon } from '@xterm/addon-canvas';
import { FitAddon } from '@xterm/addon-fit';
import { Terminal } from '@xterm/xterm';
import { useElementSize } from 'hooks-react-custom';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import FileExplore from '@/classes/FileExplore';
import Box from '@/components/CommonStyled/Box';
import Text from '@/components/Text';
import WebContainer from '@/libs/WebContainer';
import { setUrlHosting } from '@/pages/editor';
import { useAppDispatch } from '@/stores/hooks';
import { Nullable } from '@/types/common';
import { FileExploreTreeType, FileType } from '@/types/FileManager';
import EventHelper from '@/utils/EventHelper';

import { TerminalContainerStyled, WrapperTerminalStyled } from './styled';

export const EVENT_TERMINAL_ACTION = 'terminal:action';
export enum TerminalActionType {
  RENAME,
  REMOVE,
  CREATE,
}
export type TerminalActionData = {
  file: FileExploreTreeType;
  oldFile?: FileExploreTreeType;
  action: TerminalActionType;
};

const EditorTerminal = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const dispatch = useAppDispatch();

  const terminal = useRef<Terminal>(
    new Terminal({
      convertEol: true,
      customGlyphs: true,
      fontWeight: '600',
      fontWeightBold: '700',
      lineHeight: 1.2,
      fontSize: 13,
      allowProposedApi: true,
      theme: {
        background: colors.wash100,
        selectionBackground: colors.neutral500,
        cursor: colors.neutral300,
        white: '#ff0000',
      },
    }),
  );
  const fitAddon = useRef(new FitAddon());
  const divRef = useRef<HTMLDivElement>(null);

  const [wrapperRef, size] = useElementSize();

  async function startShell(_fileExplore: Nullable<FileExplore>) {
    const shellProcess = await WebContainer.runCMD('jsh');
    shellProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.current.write(data);
        },
      }),
    );
    const input = shellProcess.input.getWriter();
    terminal.current.onData((data) => {
      input.write(data);
    });
    if (_fileExplore) {
      const projectName = 'project';
      await WebContainer.mount({
        [projectName]: {
          directory: _fileExplore.toFileSystemTree(),
        },
      });
      const packageJsonStr = await WebContainer.readFile(`/${projectName}/package.json`);
      const packageJsonFile = JSON.parse(packageJsonStr);
      const scripts = packageJsonFile?.scripts;
      const command = Object.keys(scripts).includes('start')
        ? 'start'
        : Object.keys(scripts).includes('dev')
          ? 'dev'
          : null;
      if (command) {
        await input.write(`cd ./${projectName}/ && clear && npm i && npm run ${command}\n`);
      }
    }
    return shellProcess;
  }

  const loadTerminal = async (_fileExplore: Nullable<FileExplore>) => {
    if (divRef.current && _fileExplore) {
      terminal.current.reset();
      terminal.current.loadAddon(fitAddon.current);
      const canvas = new CanvasAddon();
      terminal.current.loadAddon(canvas);
      fitAddon.current.fit();
      terminal.current.open(divRef.current);
      startShell(_fileExplore);
    }
  };

  const handleTerminalAction = (data: TerminalActionData) => {
    const _prefix = '/project';
    switch (data.action) {
      case TerminalActionType.CREATE:
        if (data.file.type === FileType.DIRECTORY) WebContainer.mkdir(_prefix + data.file.path);
        else if (data.file.type === FileType.FILE) WebContainer.writeFile(_prefix + data.file.path);
        break;
      case TerminalActionType.RENAME:
        data.oldFile &&
          WebContainer.renameFile(_prefix + data.oldFile?.path, _prefix + data.file.path);
        break;
      case TerminalActionType.REMOVE:
        WebContainer.deleteFile(_prefix + data.file.path);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    WebContainer.onServerReady((_, url) => {
      dispatch(setUrlHosting(url));
    });

    const removeTerminalLoad = EventHelper.subscriber<FileExplore>('terminal:load', ({ detail }) =>
      requestIdleCallback(() => loadTerminal(detail)),
    );
    const removeTerminalAction = EventHelper.subscriber<TerminalActionData>(
      EVENT_TERMINAL_ACTION,
      ({ detail }) => handleTerminalAction(detail),
    );
    return () => {
      removeTerminalLoad();
      removeTerminalAction();
    };
  }, []);

  useEffect(() => {
    fitAddon.current.fit();
  }, [size]);

  return (
    <WrapperTerminalStyled ref={wrapperRef}>
      <Box $padding="8px 12px">
        <Text fontSize="sm" color={colors.neutral500}>{t`terminal`}</Text>
      </Box>
      <TerminalContainerStyled ref={divRef}></TerminalContainerStyled>
    </WrapperTerminalStyled>
  );
};

export default EditorTerminal;
