import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

const Input = styled.input`
  background: #e9e9e9;
  border: ${props => (props.error ? '1px solid red' : '1px solid #c9c9c9')};
  border-radius: 4px;
  width: 100%;
  padding: 20px;
  font-size: 15px;
  font-weight: bold;
`;

const Error = styled.p`
  margin-top: 5px;
  color: red;
`;

const Info = styled.small`
  margin-top: 5px;
  opacity: 0.8;
`;

const CodeInputGroup = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  label,
  info,
  disable
}) => {
  return (
    <Wrapper>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
        disable={disable}
      />
      {info && <Info>{info}</Info>}
      {error && <Error>{error}</Error>}
    </Wrapper>
  );
};

CodeInputGroup.defaultProps = {
  type: 'text'
};

export default CodeInputGroup;
