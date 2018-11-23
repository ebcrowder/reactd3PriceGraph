import * as React from 'react';
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

export interface Props {
  currentValue: string;
  onClick: any;
  currency: string;
}

const Card = (props: Props) => {
  return (
    <CardContainer onClick={props.onClick}>
      <div>
        <p>{props.currentValue}</p>
      </div>
      <div>
        <p>{props.currency}</p>
      </div>
    </CardContainer>
  );
};

export default Card;
