import React from 'react';
import {css} from "styled-components";
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import {formatPrice, pluralize, isNewShoe, formatVariant} from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const isSalePriceAvailable = !!salePrice;

  return (
    <ShoeCardLink href={`/shoe/${slug}`}>
      { variant !== 'default' && (
        <VariantLabel variant={variant}>
          {formatVariant(variant)}
        </VariantLabel>
      )}
      <ShoeCardWrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <PriceWrapper>
            <Price strikethrough={isSalePriceAvailable}>{formatPrice(price)}</Price>
            { isSalePriceAvailable && <SalePrice>{formatPrice(salePrice)}</SalePrice> }
          </PriceWrapper>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
      </ShoeCardWrapper>
    </ShoeCardLink>
  );
};

export const ShoeCardLink = styled.a`
  position: relative;
  text-decoration: none;
  color: inherit;
`;

export const ShoeCardWrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const VariantLabel = styled.span`
  color: white;
  position: absolute;
  top: 10px;
  right: -10px;
  z-index: 1;
  padding: 5px 10px;
  font-size: 0.85rem;
  
  ${p => {
    switch (p.variant) {
      case 'on-sale': {
        return css`
          background-color: ${COLORS.primary};
        `;
      }
      case 'new-release': {
        return css`
          background-color: ${COLORS.secondary};
        `;
      }
      default: {
        return '';
      }
    }
  }};
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  position: relative;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
  padding-right: 4ch; 
`;

const PriceWrapper = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
`;

const Price = styled.span`
  ${p => p.strikethrough && css`
    text-decoration: line-through;
    color: gray;
  ` };
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
