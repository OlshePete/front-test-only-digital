import React, { useRef, useEffect, useState } from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    background: #fff;
    margin: 0;
    padding: 0;
    position: relative;
  }
`;

const Container = styled.div`
  position: relative;
  max-width: 500px;
  margin: auto;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Item = styled.div<{ active?: boolean }>`
  width: 50px;
  height: 50px;
  color: white;
  text-align: center;
  line-height: 50px;
  font-size: 24px;
  font-family: "Roboto", sans-serif;
  border-radius: 100%;
  background-color: ${props => (props.active ? 'blue' : 'red')};
  z-index: 1;
  cursor: pointer;
`;

const Svg = styled.svg`
  height: 300px;
  overflow: visible;
  width: 300px;
  z-index: -1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const St0 = css`
  fill: none;
  stroke: #000000;
  stroke-width: 2;
  stroke-miterlimit: 1;
`;

const Start = styled.div`
  position: absolute;
  top: 50%;
  right: -30px;
`;

const RoundBlock: React.FC = () => {
  const [tl] = useState<gsap.core.Timeline>(gsap.timeline({ paused: true, reversed: true }));
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const [tracker, setTracker] = useState({ item: 0 });
  const itemStep = 1 / (itemsRef.current.length || 1); // Assuming a default value of 1 if length is 0

  useEffect(() => {
    const circlePath = MotionPathPlugin.convertToPath("#holder", false)?.[0] as SVGPathElement;
    if (circlePath) {
      circlePath.id = "circlePath";
      document.querySelector("svg")?.prepend(circlePath);

      gsap.set(itemsRef.current, {
        motionPath: {
          path: circlePath,
          align: circlePath,
          alignOrigin: [0.5, 0.5],
          // end: (i: number) => +(i / itemsRef.current.length),
        },
        scale: 0.9,
      });
    }

    // ... (rest of the GSAP logic)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Wrapper>
          {Array.from({ length: 8 }, (_, i) => (
            <Item
              key={i}
              ref={el => (itemsRef.current[i] = el)}
              active={tracker.item === i}
              onClick={() => handleItemClick(i)}
            >
              {i + 1}
            </Item>
          ))}
          <Svg viewBox="0 0 300 300">
            <circle id="holder" className={`${St0}`} cx="151" cy="151" r="150" />
          </Svg>
        </Wrapper>
        <Start>&#8592; Active</Start>
      </Container>
      <Container style={{ textAlign: 'center' }}>
        <button id="prev" onClick={() => moveWheel(itemStep)}>
          Prev
        </button>
        <button id="next" onClick={() => moveWheel(-itemStep)}>
          Next
        </button>
      </Container>
    </>
  );

  function handleItemClick(i: number) {
    // ... (handle item click logic)
  }

  function moveWheel(amount: number) {
    // ... (moveWheel logic)
  }
};

export default RoundBlock;
