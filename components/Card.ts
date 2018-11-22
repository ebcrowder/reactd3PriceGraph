import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  box-shadow: 0 4px 8px 0 #000000;
  transition: 0.3s;
  width: 15rem;
  height: 10rem;
  text-align: center;
  display: grid;
  grid-template-columns: 5rem;
  font-size: 30px;
  justify-content: center;
`;

export const CardGrid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-rows: auto;
`;

const Card = ({ currentBase, currentValue, onClick }) => {
  return (
    <CardContainer onClick={onClick}>
      <div>
        <p>{currentValue}</p>
      </div>
      <div>
        <p>{currentBase}</p>
      </div>
    </CardContainer>
  );
};

export default Card;
