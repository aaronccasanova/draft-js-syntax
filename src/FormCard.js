import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid grey;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.09);
  border-radius: 4px;
  padding: 40px;
  background: #fff;
`;

const MainHeading = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const SubHeading = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  > * {
    margin: 10px 0;
  }
`;

const SubmitButton = styled.button`
  padding: 20px;
  font-weight: bold;
  font-size: 15px;
  border-radius: 4px;
  background: lightsteelblue;
  color: #fff;
`;

const FormCard = props => {
  return (
    <Card>
      <MainHeading>{props.mainHeading}</MainHeading>
      <SubHeading>{props.subHeading}</SubHeading>
      <Form onSubmit={props.onSubmit}>
        {props.children}
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
    </Card>
  );
};

export default FormCard;
