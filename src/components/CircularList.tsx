import React, { FC, useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MotionPathPlugin from "gsap/MotionPathPlugin";

import styled from "styled-components";

import useMediaQuery from "../hooks/useMediaQuery";

import CircularItem from "./CircularItem";
import DateSummary from "./summaries/DateSummary";
import ItemsSwiper from "./swipers/ItemsSwiper";
import { CircularListProps } from "types";

const CircularList: FC<CircularListProps> = ({dataset}) => {
  gsap.registerPlugin(MotionPathPlugin);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const tracker = useRef<{ active: number }>({
    active: 0,
  });
  const wrapper = useRef<HTMLDivElement | null>(null);

  const isMobile = useMediaQuery("(max-width: 1024px)");
  const numItems = dataset.length;
  const itemStep = 1 / dataset.length;

  const snap = gsap.utils.snap(itemStep); //- функция => приближает значение к установленому шагу
  const wrapTracker = gsap.utils.wrap(0, dataset.length);
  const wrapProgress = gsap.utils.wrap(0, 1);

  const tl = useRef<gsap.core.Timeline | undefined>(undefined);

  useGSAP(
    () => {
      if (isMobile) return;
      tl.current = gsap.timeline({
        paused: true,
        reversed: true,
      });

      if (wrapper.current && tl.current) {
        const itemsRaw: HTMLCollectionOf<HTMLDivElement> =
          wrapper.current.getElementsByClassName(
            "item"
          ) as HTMLCollectionOf<HTMLDivElement>;
        const items: gsap.core.Tween[] = gsap.utils.toArray(itemsRaw);
        const path = MotionPathPlugin.convertToPath("#holder", false)[0];

        if (items && dataset.length > 0) {
          items.forEach((item, i, { length }) => {
            gsap.set(item as gsap.core.Tween, {
              duration: 10,
              motionPath: {
                path: path,
                align: path,
                alignOrigin: [0.5, 0.5],
                end: i / length - itemStep,
              },
            });
          });
          tl.current
            .add("rotation")
            .to(wrapper.current, {
              rotation: 360,
              transformOrigin: "center center",
              duration: 1,
              ease: "none",
            })
            .to(
              items as gsap.core.Tween[],
              {
                rotation: "-=360",
                transformOrigin: "center",
                duration: 1,
                ease: "none",
              },
              "<"
            )
            .to(
              tracker.current,
              {
                active: numItems,
                opacity: 0,
                duration: 1,
                ease: "none",
                modifiers: {
                  active(value) {
                    return wrapTracker(numItems - Math.round(value));
                  },
                },
              },
              0
            );
        }
      }
    },
    {
      dependencies: [isMobile],
      scope: wrapper,
    }
  );

  function moveWheel(amount: number) {
    if (tl.current) {
      const progress = tl.current.progress();

      gsap.to(".item:not(.active)", {
        scale: 0.1,
        duration: 0.1,
      });
      gsap.to(".active", {
        scale: 1,
      });
      gsap.to(tl.current, {
        progress: snap(progress + amount),
        modifiers: {
          progress: (i: number) => {
            return wrapProgress(i);
          },
        },
      });
    }
  }


  const handleClickItem = (newIndex: number) => {
    setActiveIndex(newIndex);
    if (wrapper.current?.children) {
      const children = wrapper.current.children;
      const items = gsap.utils.toArray(
        wrapper.current.getElementsByClassName("item")
      );
      let prevIndex: number = tracker.current.active;
      Array.from(children).forEach((child: Element, i: number) => {
        if (child.classList.contains("active")) {
          prevIndex = i;
        }
        child.classList.remove("active");
      });
      const activeElement = children[newIndex] as HTMLElement;
      if (activeElement && activeElement.classList.contains("item")) {
        activeElement.classList.add("active");
      }
      const diff = prevIndex - newIndex;
      if (items) {
        if (Math.abs(diff) < numItems / 2) {
          moveWheel(diff * itemStep);
        } else {
          var amt = numItems - Math.abs(diff);

          if (prevIndex > newIndex) {
            moveWheel(amt * -itemStep);
          } else {
            moveWheel(amt * itemStep);
          }
        }
      }
    }
  };

  return (
    <Container $isMobile={isMobile} id="test">
      <MainHeader> Исторические <br /> даты </MainHeader>

      {!isMobile && (
        <WrapperMain ref={wrapper} className="wrapper" key={"wrapper"}>
          {dataset.map(({ label }, i) => {
            return (
              <CircularItem
                handleItemClick={handleClickItem}
                active={activeIndex === i}
                key={label + i}
                index={i}
              />
            );
          })}
          <svg
            width="530"
            height="530"
            viewBox="0 0 530 530"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="holder"
              stroke="#42567A"
              opacity="0.2"
              d="M529.5,265 C529.5,411.07932 411.07932,529.5 265,529.5 118.92068,529.5 0.5,411.07932 0.5,265 0.5,118.92068 118.92068,0.5 265,0.5 411.07932,0.5 529.5,118.92068 529.5,265 z"
            ></path>
          </svg>
        </WrapperMain>
      )}
      <DateSummary dataset={dataset} activeIndex={activeIndex} />
      <ItemsSwiper
        activeIndex={activeIndex}
        items={dataset}
        handleActiveChange={(i: number) => {
          handleClickItem(i);
        }}
        onResize={() => {
          console.log("resize");
          //TODO update dot positions on resize
        }}
      />
    </Container>
  );
};

export default CircularList;

const Container = styled.div<{
  $isMobile: boolean;
}>`
  position: relative;
  padding: 40px 0;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: calc(530px / 2 + 40px);
    width: 100%;
    height: 1px;
    background: var(--brand-color-black-blue);
    display: ${(props) => (!props.$isMobile ? "block" : "none")};
    opacity: 0.2;
    z-index: -11;
  }
  @media (max-width: 1200px) {
    display: flex;
    padding: 40px 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  @media (max-width: 768px) {
    padding: 0;
    padding-top: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    outline: 1px dashed blue;
  }
`;
const WrapperMain = styled.div`
  position: relative;
  min-height: 530px;
  max-height: 530px;
  & > svg {
    height: 530px;
    overflow: visible;
    width: 530px;
    z-index: -1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @media (max-width: 1200px) and (min-width: 768px) and (max-height: 790px) {
    transform: scale(0.6);
  }
`;

const MainHeader = styled.h1`
  position: absolute;
  padding-left: 78px;
  border-left: 5px solid;
  border-image: linear-gradient(
      var(--brand-color-blue),
      var(--brand-color-fuchsia)
    )
    30;
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
    margin-top: 60px;
  }
  @media (max-width: 768px) {
    padding-top: 0px;
    margin-top: 0px;
    position: relative;
    top: 0;
    left: 0;
    font-size: 20px;
  } 
`;
