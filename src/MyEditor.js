import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';
import styled from 'styled-components';

const Wrapper = styled.div`
  /* ---------For Editing Layout---------- */
  border: 2px solid red;
  /* ------------------------------------- */
`;

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
  }
  render() {
    return (
      <Wrapper>
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
      </Wrapper>
    );
  }
}

export default MyEditor;
