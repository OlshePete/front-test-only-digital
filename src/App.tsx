import React, { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import gsap, { TweenLite } from "gsap";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap');
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;
const Wrapper = styled.div`
  position: relative;
  /* margin-top: 50px;*/
  margin: 0 auto; 
  height: 100svh;
  max-width: 1440px;
  border: 1px solid rgba(66, 86, 122, 0.2);
  &::after {
    content:'';
    position:absolute;
    left:0;
    top:calc(20svh + 265px);
    width:100%;
    height:1px;
    background:#42567A;
    opacity:.2;
  }
  &::before {
    content:'';
    position:absolute;
    left:50%;
    top:0;
    width:1px;
    height:100%;
    background:#42567A;;
    opacity:.2;
  }
`;

const Container = styled.div`

  margin:0 auto;
  height: 530px;
  width: 530px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  /*overflow: hidden;  Скрытие части, которую мы будем вращать */
`;

const InnerContainer = styled.div`
  position: relative;
  margin-top: 15svh;
  padding-top: 5svh;
`;
const MainHeader = styled.h1`
    position: absolute;
    padding-left:78px;
    border-left:5px solid red;
    border-image: linear-gradient(#3877EE, #EF5DA8) 30;
  /* border-width: 4px;
  border-style: solid; */
    top:0;
    left:-2px;
    color: #42567A;
    font-family: 'PT Sans', sans-serif;
    font-size: 56px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
`;
const Item = styled.div<{
  width: number;
  angle: number;
  posY: number;
  posX: number;
}>`
  position: absolute;
  height: 6px;
  width: 6px;
  top: ${(props) => props.posX}px;
  left: ${(props) => props.posY}px;
  border-radius: 50%;
  background: #42567a;
  line-height: 6px;
  color: #42567a;
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
  }
  &.active {
    background: white;
    border: 1px solid #42567a;
    width: 56px;
    height: 56px;
    & > span {
      display: block;
    }
  }
  & > span {
    display: none;
    position: relative;
  }
  &:hover {
    background: white;
    border: 1px solid #42567a;
    width: 56px;
    height: 56px;
    & > span:first-child {
      display: block;
    }
  }
`;

const StartButton = styled.div`
  display: inline-block;
  background: #cccc;
  padding: 10px 25px;
  border: 1px solid #000;
  cursor: pointer;
`;
interface Item {
  width: number;
  angle: number | null;
  posX: number | null;
  posY: number | null;
  label: string;
}

const App: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Item[]>([
    {
      label: "заголовок1",
      width: 30,
      angle: -1.5707963267948966,
      posX: null,
      posY: null,
    },
    {
      label: "заголовок2",
      width: 30,
      angle: -1.158855956842314,
      posX: null,
      posY: null,
    },
    {
      label: "заголовок3",
      width: 30,
      angle: -0.334975216937149,
      posX: 194.4418457249614,
      posY: 67.12542356071204,
    },
    {
      label: "заголовок4",
      width: 30,
      angle: 0.488905522968016,
      posX: 188.28474192681682,
      posY: 146.96599134390067,
    },
    {
      label: "заголовок5",
      width: 30,
      angle: 1.312786262873181,
      posX: 125.51569898786613,
      posY: 196.68996382852055,
    },
    {
      label: "заголовок6",
      width: 30,
      angle: 2.136667002778346,
      posX: 46.38490240145492,
      posY: 184.41221066586567,
    },
  ]);
  const [activeIndex, setActiveIndex] = useState<{
    index: number;
    prev: number | null;
    angle: number | null;
  }>({ index: 0, prev: null, angle: null });

  const radius = 530/2;
  const step = (-2 * Math.PI) / items.length;
  let stepDeg = -360 / items.length;
  const startingAngle = (5 * Math.PI) / 6;
  const length = items.length;

  function calculateStepsToTarget(prevIndex: number, newIndex: number) {
    if (newIndex === prevIndex) return 0;
    let positiveStep = 0;
    if (newIndex < prevIndex) {
      positiveStep = prevIndex - newIndex;
    } else {
      positiveStep = length - (newIndex + 1) + (prevIndex + 1);
    }
    if (positiveStep > length - positiveStep) return -(length - positiveStep);

    return positiveStep;
  }

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
        calculateStepsToTarget(activeIndex?.prev ?? 0, activeIndex.index);
      return { index, prev: p.index, angle: new_angle };
    });
  };

  useEffect(() => {
    if (!items.every((item) => item.posX !== null && item.posY !== null)) {
      getPositions();
    }
  }, [items]);

  console.log("activeIndex", activeIndex);
  const oneRotationStep = -stepDeg;

  const tl = useRef<gsap.core.Timeline>(
    gsap.timeline({ autoRemoveChildren: false })
  );

  useEffect(() => {
    //  console.log("Анимируем вращение контейнера");
    if (container.current) {
      const steps = calculateStepsToTarget(0, activeIndex.index);
      // console.log("нужно сделать ", steps, " шагов по ",stepDeg," итого:", stepDeg*steps);

      const activeItem = container.current.querySelector(".active");
      tl.current = gsap.timeline({ duration: 0.2 });
      tl.current
        .to(container.current, {
          rotation: oneRotationStep * steps,
          overwrite: true,
          ease: "power2.inOut",
        })
        .to(
          container.current.children,
          {
            rotation: -oneRotationStep * steps,
          },
          "-=1"
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
  }, [activeIndex, items]);

  return (
    <Wrapper>
      <GlobalStyle />
      <InnerContainer>
<MainHeader>Исторические <br/>даты</MainHeader>
      <Container ref={container} className="container">
        {items.map(({ width, posX, posY, angle, label }, index) => {
          console.log(posX, posY, index);
          return (
            <Item
              key={index}
              className={index === activeIndex.index ? "active" : ""}
              width={width}
              angle={angle || 0}
              posX={posX || 0}
              posY={posY || 0}
              onClick={() => handleItemClick(index)}
            >
              <span> {index + 1}</span>
              <span className="label">{label}</span>
            </Item>
          );
        })}
      </Container>
      <StartButton
        onClick={() =>
          setItems(
            items
              .slice(0, items.length - 1)
              .map((it) => ({ ...it, posY: null }))
          )
        }
      >
        Start
      </StartButton>
      </InnerContainer>
    </Wrapper>
  );
};

export default App;
