import React, { FC, useEffect, useRef } from "react";
import styled from "styled-components";

import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import useMediaQuery from "../../hooks/useMediaQuery";
import { EventSwiperProps } from "../../types";

import NavIcon from "../icons/NavIcon";


const CustomSwiper = styled(Swiper)`
  width: 100%;
  & > * > .swiper-pagination-bullet-active {
    background: var(--brand-color-black-blue);
  }
  .swiper-button-disabled {
    opacity: 0;
  }
  @media (min-width: 1024px) {
  }
  @media (max-width: 1024px) {
    padding: 0;
    padding-bottom: 60px;
    .swiper-button {
      display: none;
    }
    .swiper-slide {
      width:60%
    }
  }
`;
const Container = styled.div<{
  $isMobile: boolean;
}>`
  margin: ${(props) => (props.$isMobile ? "0" : "56px 0 0 0")};
  position: relative;
  height: auto;
  display: flex;
  align-items: center;
  & > .nav-element {
    padding:0 20px;
  }
  @media (max-width: 1024px) {
    & > .nav-element {
      display:none;
    }
  }
`;
const NavEL = styled.div`
  & > svg {
    width: 40px;
    height: 40px;
  }
  
`

const SwiperSlideWrapper = styled(SwiperSlide)`
  height: 135px;
  width: 400px;
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
    font-family: PT Sans;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  }
  @media (min-width: 1024px) {
  }
  @media (max-width: 1024px) {
    height: auto;
    width: 30%;
    & > span {
      font-size: 16px;
    }
    & > p {
      font-size: 14px;
    }
  }
`;

const EventSwiper: FC<EventSwiperProps> = ({ activeIndex, events }) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      swiperInstance.slideTo(0);
    }
  }, [activeIndex]);

  const pagination = {
    clickable: true,
  };
  const navigation = {
    nextEl: ".events-swiper-button-next",
    prevEl: ".events-swiper-button-prev",
  };
  return (
    <Container ref={containerRef} $isMobile={isMobile}>
      <NavEL className="nav-element">
      <NavIcon
        size={40}
        opposite={false}
        className={"swiper-button events-swiper-button-prev"}
        fill={"var(--brand-color-white)"}
        circleColor={"var(--brand-color-white)"}
      />
    </NavEL>
      {events && (
        <CustomSwiper
          ref={swiperRef}
          spaceBetween={80}
          slidesPerView={'auto'}
          pagination={pagination}
          navigation={navigation}
          modules={[Pagination, Navigation]}
          breakpoints={{
            320: {
              spaceBetween: 25,
            },
            480: {
              spaceBetween: 30,
            },
            756: {
              spaceBetween: 30,
            },
            1200: {
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
              >
                <span>{year}</span> <p>{content}</p>
              </SwiperSlideWrapper>
            );
          })}
        </CustomSwiper>
      )}
      <NavEL className="nav-element">
          <NavIcon
            size={40}
            opposite={true}
            className={"swiper-button events-swiper-button-next"}
            fill={"var(--brand-color-white)"}
            circleColor={"var(--brand-color-white)"}
          />
      </NavEL>
    </Container>
  );
};

export default EventSwiper;
