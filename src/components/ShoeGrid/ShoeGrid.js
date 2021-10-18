import React from 'react';
import {css} from "styled-components";
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


const getShoeCardLinkWidth = (
  // flex gap property set in parent - this argument must match with it
  gap,
  // number of columns we want to see displayed in the product "grid"
  columns
) => css`calc((100% - ${gap * (columns - 1)}px) / ${columns})`;

const Wrapper = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  isolation: isolate;

  ${ShoeCardLink} {
    width: ${getShoeCardLinkWidth(24, 4)};
  }
`;

export default ShoeGrid;
