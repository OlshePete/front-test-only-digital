import React, { FC, useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { CircularItemProps } from "types";

const CircularItem: FC<CircularItemProps> = ({
  index,
  handleItemClick,
  active,
}) => {
  const ItemRef = useRef(null);
  const hoverRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!ItemRef.current) return;
    hoverRef.current = gsap
      .timeline({
        paused: true,
        reversed: true,
      })
      .to(ItemRef.current, {
        scale: 1,
        transformOrigin: "center",
        duration: 0.2,
        ease: "ease-in-out",
      })
      .to(
        "#number",
        {
          opacity: 1,
          scale: 1,
          transformOrigin: "center",
          duration: 0.2,
          ease: "ease-in-out",
        },
        "<"
      );
  }, [ItemRef.current]);

  return (
    <Block
      ref={ItemRef}
      onClick={(e) => {
        hoverRef?.current?.pause();
        handleItemClick(index);
      }}
      id="item"
      className={`item ${index + 1}  ${active ? "active" : ""}`}
      onMouseEnter={() => {
        hoverRef?.current?.play();
      }}
      onMouseLeave={() => {
        hoverRef?.current?.reverse();
      }}
    >
      <span id="number">{index + 1}</span>
    </Block>
  );
};

export default CircularItem;

const Block = styled.div<{
  ref?: React.RefObject<HTMLDivElement>;
}>`
  cursor: pointer;
  position: absolute;
  width: 56px;
  height: 56px;
  background: var(--brand-color-black-blue);
  border-radius: 100%;
  color: var(--brand-color-black-blue);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  &:not(.active) {
    transform: scale(0.1);
  }
  & > #number {
    font-size: 20px;
    color: var(--brand-color-black-blue);
  }
  &:hover {
    background-color: var(--brand-color-background);
    color: white;
    outline: 0.1px solid var(--brand-color-border-active-circle-item);
  }
  &.active {
    background-color: var(--brand-color-background);
    outline: 0.1px solid var(--brand-color-border-active-circle-item);
    & > #number {
      opacity: 1 !important;
    }
  }
  & > svg {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
