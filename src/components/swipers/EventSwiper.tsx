import React, { FC, useRef } from "react";
import styled from "styled-components";

import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import useMediaQuery from "../../hooks/useMediaQuery";
import { EventSwiperProps } from "../../types";

import NavIcon from "../icons/NavIcon";

const CustomSwiper = styled(Swiper)`
  width: 100%;
  height: auto;
  & > .swiper-wrapper {
    z-index: 2;
  }
  @media (min-width: 799px) {
    .swiper-pagination {
      display: none;
    }
  }
  @media (max-width: 1024px) {
    padding: 0;
    .swiper-button {
      display: none;
    }
    .swiper-slide {
      width: 60%;
    }
  }
  @media (max-width: 799px) {
    width: 100%;
    padding: 0;
  }
`;
const Container = styled.div<{
  $isMobile: boolean;
}>`
  margin: ${(props) => (props.$isMobile ? " 0" : "56px 0 0 0")};
  position: relative;
  height: auto;
  display: flex;
  align-items: center;
  & > .nav-element {
    padding: 0 20px;
  }
  & > .swiper-wrapper {
    z-index:4;
  }
  .swiper-button.swiper-button-disabled {
    opacity: 0;
  }
  @media (max-width: 1440px) and (min-width: 799px) and (max-height: 790px) {
    margin: 0;
  }
  @media (max-width: 1024px) {
    height: 100%;
    margin: 0;
  }
  @media (max-width: 799px) {
    padding-top: 20px;
    & > .nav-element {
      display: none;
    }
    & > .swiper {
      height: 100%;
    }
    margin: 0;
    & > .swiper-wrapper {
      min-height: 100%;
    }
  }
`;
const NavEL = styled.div`
  & > svg {
    width: 40px;
    height: 40px;
  }
`;

const SwiperSlideWrapper = styled(SwiperSlide)`
  height: 135px;
  width: 400px;
  padding-right: 25px;
  z-index:4;
  & > span {
    color: var(--brand-color-blue);
    font-family: var(--brand-font-secondary);
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    text-transform: uppercase;
  }
  & > p {
    color: var(--brand-color-black-blue);
    font-family: 'PT Sans';
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  }
  @media (max-width: 799px) {
    width: 30%;
    height: 100%;
    & > span {
      font-size: 16px;
    }
    & > p {
      font-size: 14px;
    }
  }
`;

const EventSwiper: FC<EventSwiperProps> = ({
  activeIndex,
  events,
  onResize,
}) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery("(max-width: 799px)");

  const pagination = {
    clickable: true,
  };
  const navigation = {
    nextEl: ".events-swiper-button-next",
    prevEl: ".events-swiper-button-prev",
  };
  return (
    <Container
      ref={containerRef}
      $isMobile={isMobile}
      id="event-swiper-container"
    >
      {!isMobile && (
        <NavEL className="nav-element">
          <NavIcon
            id="events"
            size={40}
            opposite={false}
            className={"swiper-button events-swiper-button-prev"}
            fill={"var(--brand-color-white)"}
            circleColor={"var(--brand-color-white)"}
          />
        </NavEL>
      )}
      {events && (
        <CustomSwiper
          ref={swiperRef}
          spaceBetween={0}
          slidesPerView={"auto"}
          pagination={pagination}
          navigation={navigation}
          observer={true}
          onObserverUpdate={(swiper: SwiperClass) => swiper.setProgress(0)}
          touchStartPreventDefault={true}
          modules={[Pagination, Navigation]}
          onResize={onResize}
          breakpoints={{
            319: {
              spaceBetween: 0,
            },
            799: {
              spaceBetween: 0,
            },
            1024: {
              spaceBetween: 80,
            },
          }}
        >
          {events.map(({ year, content }, index) => {
            return (
              <SwiperSlideWrapper
                key={
                  index + activeIndex + content + year + new Date().getUTCDate()
                }
                onClick={() => console.log("click slide", index)}
              >
                <span>{year}</span> <p>{content}</p>
              </SwiperSlideWrapper>
            );
          })}
        </CustomSwiper>
      )}
      {!isMobile && (
        <NavEL className="nav-element">
          <NavIcon
            id="events"
            size={40}
            opposite={true}
            className={"swiper-button events-swiper-button-next"}
            fill={"var(--brand-color-white)"}
            circleColor={"var(--brand-color-white)"}
          />
        </NavEL>
      )}
    </Container>
  );
};

export default EventSwiper;
