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

class PrismEditorExample extends Component {
  constructor(props) {
    super(props);

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

    this.state = {
      editorState: EditorState.createWithContent(contentState, decorator)
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => {
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

    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.keyBindingFn = e => this._keyBindingFn(e);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
    this.onTab = e => this._onTab(e);
    this.onReturn = e => this._onReturn(e);
  }

  _handleKeyCommand(command) {
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
  }

  _keyBindingFn(e) {
    let editorState = this.state.editorState;
    let command;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      command = CodeUtils.getKeyBinding(e);
    }
    if (command) {
      return command;
    }

    return Draft.getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  _onTab(e) {
    let editorState = this.state.editorState;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return;
    }

    this.onChange(CodeUtils.onTab(e, editorState));
  }

  _onReturn(e) {
    let editorState = this.state.editorState;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return;
    }

    this.onChange(CodeUtils.handleReturn(e, editorState));
    return true;
  }

  render() {
    const { placeholder, error, info } = this.props;
    const { editorState } = this.state;

    return (
      <React.Fragment>
        <Wrapper error={error}>
          <div className="RichEditor-root">
            <div className="RichEditor-editor" onClick={this.focus}>
              <Editor
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                keyBindingFn={this.keyBindingFn}
                onChange={this.onChange}
                placeholder={placeholder}
                ref="editor"
                spellCheck={true}
                handleReturn={this.onReturn}
                onTab={this.onTab}
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

export default PrismEditorExample;
