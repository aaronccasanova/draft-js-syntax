import React, { Component } from 'react';
import styled from 'styled-components';
import Draft, {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw
} from 'draft-js';
import PrismDraftDecorator from 'draft-js-prism';
import CodeUtils from 'draft-js-code';

var decorator = new PrismDraftDecorator();
var contentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      type: 'code-block',
      text: ''
    }
  ]
});

// Javascript ^^^^^^^^^^^^^^
// -------------------------
// Styled Components vvvvvvv

const Wrapper = styled.div`
  overflow-x: auto;
  border: ${props => (props.error ? '1px solid red' : '1px solid #c9c9c9')};
  background: #f9f9f9;
  border-radius: 4px;
`;

const Error = styled.p`
  margin-top: -5px;
  color: red;
`;

const Info = styled.small`
  margin-top: -5px;
  opacity: 0.8;
`;

class CodeInputArea extends Component {
  state = {
    editorState: EditorState.createWithContent(contentState, decorator)
  };

  focus = () => this.refs.editor.focus();

  onChange = editorState => {
    // Send editor contents to codeValue prop
    const contentState = editorState.getCurrentContent();
    const allContent = convertToRaw(contentState)
      .blocks.map(block => block.text)
      .join('\n');

    this.props.codeValue(allContent);
    // const stringContent = convertToRaw(contentState).blocks[0].text;
    // this.props.codeValue(stringContent);

    this.setState({ editorState });
  };

  handleKeyCommand = command => {
    const { editorState } = this.state;
    let newState;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command);
    }

    if (!newState) {
      newState = RichUtils.handleKeyCommand(editorState, command);
    }

    // add && newState.length > 0 to check if there is any content in the editor
    // previous functionality would delete the syntax highlighted editor, which would not re-render without a page refresh
    if (newState && newState.length > 0) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  keyBindingFn = e => {
    let editorState = this.state.editorState;
    let command;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      command = CodeUtils.getKeyBinding(e);
    }
    if (command) {
      return command;
    }

    return Draft.getDefaultKeyBinding(e);
  };

  onTab = e => {
    let editorState = this.state.editorState;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return;
    }

    this.onChange(CodeUtils.onTab(e, editorState));
  };

  onReturn = e => {
    let editorState = this.state.editorState;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return;
    }

    this.onChange(CodeUtils.handleReturn(e, editorState));
    return true;
  };

  render() {
    const { placeholder, error, info } = this.props;
    const { editorState } = this.state;

    return (
      <React.Fragment>
        <Wrapper error={error}>
          <div className="RichEditor-root">
            <div className="RichEditor-editor" onClick={this.focus}>
              <Editor
                ref="editor"
                spellCheck={true}
                onTab={this.onTab}
                editorState={editorState}
                onChange={this.onChange}
                placeholder={placeholder}
                handleReturn={this.onReturn}
                keyBindingFn={this.keyBindingFn}
                handleKeyCommand={this.handleKeyCommand}
              />
            </div>
          </div>
        </Wrapper>
        {info && <Info>{info}</Info>}
        {error && <Error>{error}</Error>}
      </React.Fragment>
    );
  }
}

export default CodeInputArea;
