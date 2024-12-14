import Split from '@uiw/react-split';

import EditorTerminal from '../EditorTerminal';
import { LineBarSplitStyled } from '../EditorTerminal/styled';
import { WrapperStyled } from './styled';
import TextEditor from './TextEditor';

const CodeEditorView = () => {
  return (
    <WrapperStyled>
      <Split mode="vertical" renderBar={(p) => <LineBarSplitStyled {...p} />}>
        <TextEditor />
        <EditorTerminal />
      </Split>
    </WrapperStyled>
  );
};

export default CodeEditorView;
