import React, { FC } from "react";
import styled from "styled-components";

import { ItemsNavigationProps } from "../../types";

import NavIcon from "../icons/NavIcon";

const Container = styled.div`
  padding-left: 78px;
  width: 120px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  @media (max-width: 1024px) {
    padding-left: 0px;
  }
  @media (max-width: 799px) {
    position:absolute;
    top:calc(100% - 70px);
    width: 60px;
    z-index:3;
    row-gap:10px;
    column-gap:8px;
    padding-left: 0px;
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

const ItemsNavigation: FC<ItemsNavigationProps> = ({
  itemsLength,
  activeIndex,
  handleSetActive,
}) => {
  return (
    <Container>
      <ActiveItemSummary>
        {`${activeIndex + 1}`.padStart(2, "0")}/
        {`${itemsLength}`.padStart(2, "0")}
      </ActiveItemSummary>
      <NavIcon
        opposite={false}
        id="items"
        onClick={() =>
          handleSetActive(activeIndex === 0 ? itemsLength - 1 : activeIndex - 1)
        }
      />
      <NavIcon
        opposite={true}
        id="items"
        onClick={() =>
          handleSetActive(activeIndex === itemsLength - 1 ? 0 : activeIndex + 1)
        }
      />
    </Container>
  );
};

export default ItemsNavigation;
