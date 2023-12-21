import React, { FC } from 'react'
import styled from 'styled-components';
import NavIcon from './NavIcon';
import { ItemsNavigationProps } from '../../types';

const Container = styled.div`
  padding-left: 78px;
  width: 120px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  @media (max-width: 1024px) {
    position:absolute;
    top:100%;
    background-color: teal;
  }
`;
const ActiveItemSummary = styled.span`
  width: 100%;
  color: var(--brand-color-black-blue);
  font-family: "PT Sans", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ItemsNavigation:FC<ItemsNavigationProps> = ({ itemsLength, activeIndex, handleSetActive }) => {
  return (
    <Container>
          <ActiveItemSummary>
            {`${activeIndex + 1}`.padStart(2, "0")}/
            {`${itemsLength}`.padStart(2, "0")}
          </ActiveItemSummary>
          <NavIcon
            opposite={false}
            onClick={() =>
              handleSetActive(
                activeIndex === 0
                  ? itemsLength - 1
                  : activeIndex - 1
              )
            }
          />
          <NavIcon
            opposite={true}
            onClick={() =>
              handleSetActive(
                activeIndex === itemsLength - 1
                  ? 0
                  : activeIndex + 1
              )
            }
          />
        </Container>
  )
}

export default ItemsNavigation