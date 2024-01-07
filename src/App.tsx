import React from "react";
import styled from "styled-components";

import useMediaQuery from "./hooks/useMediaQuery";

import CircularList from "./components/CircularList";
import { itemsInitial as dataset } from "./assets/dataset";

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
  justify-content: center;
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
  @media (max-width: 799px) {
    height: calc(100svh - 40px);
    padding: 0 20px;
  }
`;
const App: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 799px)");

  return (
    <Wrapper $isMobile={isMobile} >
      <CircularList dataset={dataset}/>
    </Wrapper>
  );
};

export default App;

