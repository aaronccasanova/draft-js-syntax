import React, { Component } from 'react';
import FormCard from './FormCard';
import CodeInputArea from './CodeInputArea';
import CodeInputGroup from './CodeInputGroup';

class CodeForm extends Component {
  state = {
    name: '',
    code: '',
    errors: {}
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChange = newCode => {
    if (newCode !== this.state.code) {
      this.setState({
        code: newCode
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const newPost = {
      code: this.state.code
    };

    console.log(newPost);
  };

  codeValue = code => {
    if (code !== this.state.code) {
      console.log(code);
      this.setState({
        code
      });
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <FormCard
        mainHeading="Sign Up"
        subHeading="Create your CPComponents account"
        onSubmit={this.handleSubmit}
      >
        <CodeInputGroup
          type="text"
          name="name"
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleInput}
          error={'there is no error'}
          info="Add your component code"
        />
        <CodeInputArea
          placeholder="* Component Code"
          codeValue={this.codeValue}
          error={errors.code}
          info="Add your component code"
        />
      </FormCard>
    );
  }
}

export default CodeForm;
