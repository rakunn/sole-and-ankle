import React from 'react';
import styled from 'styled-components/macro';

import SHOES from '../../data';
import ShoeCard from '../ShoeCard';
import {ShoeCardLink} from "../ShoeCard/ShoeCard";

const ShoeGrid = () => {
  return (
    <Wrapper>
      {SHOES.map((shoe) => (
        <ShoeCard key={shoe.slug} {...shoe} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  isolation: isolate;

  ${ShoeCardLink} {
    min-width: 270px;
    flex: 1 0 270px;
  }
`;

export default ShoeGrid;
