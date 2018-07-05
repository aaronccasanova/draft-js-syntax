import React, { Component } from 'react';
import PrismDecorator from 'draft-js-prism';
import { Editor, EditorState, RichUtils, convertFromRaw } from 'draft-js';

// Only highlights js if you change defaultSyntax: null to 'javascript' in the nodemodules/draft-js-prism/lib/options

class PrismEditorExample extends Component {
  constructor(props) {
    super(props);

    var decorator = new PrismDecorator();
    var contentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          type: 'code-block',
          text: 'var message = "This is awesome!";'
        }
      ]
    });

    this.state = {
      editorState: EditorState.createWithContent(contentState, decorator)
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => this.setState({ editorState });

    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    // add && newState.length > 0 to check if there is any content in the editor
    // previous functionality would delete the syntax highlighted editor, which would not re-render without a page refresh
    if (newState && newState.lenght > 0) {
      this.onChange(newState);
      return true;
    }

    return false;
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  render() {
    const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      // After _handleKeyCommand fix, the code below would not show the placeholder text
      // now when then editor is empty the placeholder texts appears
      // if (
      //   contentState
      //     .getBlockMap()
      //     .first()
      //     .getType() !== 'unstyled'
      // ) {
      //   className += ' RichEditor-hidePlaceholder';
      // }
    }

    return (
      <div className="RichEditor-root">
        <div className={className} onClick={this.focus}>
          <Editor
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder="Add Component Code"
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}

export default PrismEditorExample;
