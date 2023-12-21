import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";

import { ActiveIndex, Item as ItemProp } from "./types";
import { itemsInitial } from "./assets/dataset";

import useMediaQuery from "./hooks/useMediaQuery";

import DateSummary from "./components/summaries/DateSummary";
import { calculateStepsToTarget } from "./utils/utils";
import ItemsSwiper from "./components/swipers/ItemsSwiper";
import { GlobalStyle } from "./styles/GlobalStyle";


const Wrapper = styled.div<{
  $isMobile: boolean;
}>`
  position: relative;
  margin: 0;
  margin-left: calc(((100vw - 1440px) / 3) * 2);
  margin-right: calc(((100vw - 1440px) / 3));
  min-height: 100svh;
  max-width: 1440px;
  outline: 1px solid rgba(66, 86, 122, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  &::before {
    content: "";
    z-index: -11;
    position: absolute;
    display: ${(props) => (!props.$isMobile ? "block" : "none")};
    left: 50%;
    top: 0;
    width: 1px;
    height: 100%;
    background: var(--brand-color-black-blue);
    opacity: 0.2;
  }

  @media (max-width: 1440px) {
    margin: 0;
  }
  @media (max-width: 1200px) {
    gap: 0;
  }
  @media (max-width: 1024px) {
    height: calc(100svh - 40px);
    padding: 0 20px;
  }
`;

const InnerContainer = styled.div`
  z-index: 1000;
  margin: 0 auto;
  height: 530px;
  width: 530px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transition: all 0.2s easy;
  @media (max-width: 1200px) {
    transform: scale(0.8);
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;

const Container = styled.div<{
  $isMobile: boolean;
}>`
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: calc(530px / 2);
    width: 100%;
    height: 1px;
    background: var(--brand-color-black-blue);
    display: ${(props) => (!props.$isMobile ? "block" : "none")};
    opacity: 0.2;
    z-index: -11;
  }
  @media (max-width: 1200px) {
    flex-grow: 1;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
  }
`;
const MainHeader = styled.h1`
  position: absolute;
  padding-left: 78px;
  border-left: 5px solid;
  border-image: linear-gradient(var(--brand-color-blue), var(--brand-color-fuchsia)) 30;
  top: 0;
  left: -2px;
  color: var(--brand-color-black-blue);
  font-family: "PT Sans", sans-serif;
  font-size: 56px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%;
  @media (max-width: 1200px) {
    font-size: 48px;
  }
  @media (max-width: 1024px) {
    font-size: 32px;
    border: none;
    padding-left: 0;
    margin-top:60px;
  }
  @media (max-width: 768px) {
    padding-top: 0px;
    position: relative;
    top: 0;
    left: 0;
    font-size: 20px;
  } /**/
`;
const Item = styled.div<{
  width: number;
  angle: number;
  posy: number;
  posx: number;
}>`
  position: absolute;
  height: 6px;
  z-index: 1000;
  width: 6px;
  top: ${(props) => props.posx}px;
  left: ${(props) => props.posy}px;
  border-radius: 50%;
  background: var(--brand-color-black-blue);
  line-height: 6px;
  color: var(--brand-color-black-blue);
  text-align: center;
  transform: translateX(-50%) translateY(-50%)
    rotate(${(props) => props.angle}deg);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span.label {
    position: absolute;
    left: calc(100% + 20px);
    color: var(--brand-color-black-blue);
    font-family: 'PT Sans';
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
  }
  &.active {
    background: var(--brand-color-background);
    opacity: 1;
    border: 1px solid var(--brand-color-black-blue);
    width: 56px;
    height: 56px;
    & > span {
      display: block;
      opacity: 1;
    }
  }
  & > span {
    display: none;
    position: relative;
  }
  &:hover {
    background: var(--brand-color-white);
    opacity: 1;
    border: 1px solid var(--brand-color-black-blue);
    width: 56px;
    height: 56px;
    & > span:first-child {
      display: block;
    }
  }
`;

const App: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery("(max-width: 1024px)");

  const [items, setItems] = useState<ItemProp[]>(itemsInitial);
  const [activeIndex, setActiveIndex] = useState<ActiveIndex>({
    index: 0,
    prev: null,
    angle: null,
  });

  const radius = 530 / 2;
  const length = items.length;
  const step = (-2 * Math.PI) / length;
  const startingAngle = (5 * Math.PI) / 6;

  let stepDeg = -360 / length;

  const oneRotationStep = -stepDeg;

  const tl = useRef<gsap.core.Timeline>(
    gsap.timeline({ autoRemoveChildren: false })
  );

  const getPositions = () => {
    let currentAngle = startingAngle;
    const updatedItems = items.map((item, index) => {
      const newAngle = currentAngle;
      const posX = radius + radius * Math.cos(newAngle);
      const posY = radius + radius * Math.sin(newAngle);

      currentAngle = newAngle + step;

      return { ...item, angle: newAngle, posX, posY };
    });

    setItems(updatedItems);
  };

  const handleItemClick = (index: number) => {
    setActiveIndex((p) => {
      const new_angle =
        oneRotationStep *
        calculateStepsToTarget(
          activeIndex?.prev ?? 0,
          activeIndex.index,
          length
        );
      return { index, prev: p.index, angle: new_angle };
    });
  };

  useEffect(() => {
    if (!items.every((item) => item.posX !== null && item.posY !== null)) {
      getPositions();
    }
  }, [items]);

  useEffect(() => {
    if (container.current) {
      const steps = calculateStepsToTarget(0, activeIndex.index, length);
      // const stepsForLastActive = calculateStepsToTarget(activeIndex.prev ?? 0, activeIndex.index, length);
      // console.log(
      //   "нужно сделать ",
      //   steps,
      //   " шагов по ",
      //   stepDeg,
      //   " итого:",
      //   oneRotationStep * steps
      // );

      const activeItem = container.current.querySelector(".active");
      tl.current = gsap.timeline({
        duration: 0,
      });
      tl.current
        .to(container.current, {
          rotation: `${oneRotationStep * steps}_short`,
          overwrite: true,
          ease: "power2.inOut",
          delay: 0,
          duration: 0.6 * Math.abs(step),
        })
        .to(
          container.current.children,
          {
            rotation: `${(-oneRotationStep *  steps)}`,
            overwrite: true,
            duration: 0.6 * Math.abs(step),
            delay: -0.6 * Math.abs(step),
            ease: "power2.inOut",
          },
          "<"
        )
        .from(
          "#counter-min",
          {
            textContent: Math.min(
              ...items[activeIndex?.prev || 0].events.map((e) => e.year)
            ),
            snap: { textContent: 1 },
            duration: 1.2,
            stagger: 10,
          },
          "-=1"
        )
        .from(
          "#counter-max",
          {
            textContent: Math.max(
              ...items[activeIndex?.prev || 0].events.map((e) => e.year)
            ),
            snap: { textContent: 1 },
            duration: 1.2,
            stagger: 10,
          },
          "<"
        )
        .fromTo(
          activeItem?.children?.[1] || ".active>span.label",
          {
            opacity: 0,
          },
          {
            opacity: 1,
          }
        );
    }
  }, [activeIndex.index, items]);

  function handleSetActive(newIndex: number) {
    handleItemClick(newIndex);
  }

  return (
    <Wrapper $isMobile={isMobile}>
      <GlobalStyle />
      <Container $isMobile={isMobile}>
        <MainHeader>
          Исторические <br />даты
        </MainHeader>
        {!isMobile && (
          <InnerContainer ref={container} className="container">
            {items.map(({ width, posX, posY, angle, label }, index) => {
              return (
                <Item
                  key={label + String(index)}
                  className={index === activeIndex.index ? "active" : ""}
                  width={width}
                  angle={angle ?? 0}
                  posx={posX ?? 0}
                  posy={posY ?? 0}
                  onClick={() => handleItemClick(index)}
                >
                  <span> {index + 1}</span>
                  <span className="label">{label}</span>
                </Item>
              );
            })}
          </InnerContainer>
        )}

        <DateSummary events={items[activeIndex.index].events} />
      </Container>
      <ItemsSwiper
        activeIndex={activeIndex.index}
        items={items}
        handleActiveChange={handleSetActive}
        onResize={getPositions}
      />
    </Wrapper>
  );
};

export default App;
