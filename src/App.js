import React, { Component } from 'react';
import Draft, {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw
} from 'draft-js';
import PrismDraftDecorator from 'draft-js-prism';
import CodeUtils from 'draft-js-code';

class PrismEditorExample extends Component {
  constructor(props) {
    super(props);

    var decorator = new PrismDraftDecorator();
    var contentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          type: 'code-block',
          // text: ''
          text: 'var message = "This is awersome!";'
        }
      ]
    });

    this.state = {
      editorState: EditorState.createWithContent(contentState, decorator)
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => {
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
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const stringContent = convertToRaw(contentState).blocks[0].text;
    // console.log(stringContent);

    return (
      <React.Fragment>
        {this.props.render(stringContent)}
        <div className="RichEditor-root">
          <div className="RichEditor-editor" onClick={this.focus}>
            <Editor
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.keyBindingFn}
              onChange={this.onChange}
              placeholder="Tell a story..."
              ref="editor"
              spellCheck={true}
              handleReturn={this.onReturn}
              onTab={this.onTab}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PrismEditorExample;
