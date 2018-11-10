import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  margin: 30px;
  background-color: pink;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const Button = ({ onClick, currency }) => {
  return <ButtonWrapper onClick={onClick}>{currency}</ButtonWrapper>;
};

export default Button;
