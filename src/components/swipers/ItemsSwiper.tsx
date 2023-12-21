import React, { FC, useEffect, useRef } from "react";
import styled from "styled-components";

import { Navigation, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";
import NavIcon from "../navigation/NavIcon";
import { ItemsSwiperProps } from "../../types";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { PaginationOptions } from "swiper/types/modules/pagination";
import { useDebounce } from "../../hooks/useDebounce";
import EventSwiper from "./EventSwiper";

const CustomSwiper = styled(Swiper)`
  overflow: visible;
  width: 100%;
  & > * > .swiper-pagination-bullet-active {
    background: var(--brand-color-black-blue);
  }
  .swiper-button-disabled {
    opacity: 0;
  }
  @media (min-width: 1024px) {
    .swiper-pagination {
      display: none;
    }
  }
  @media (max-width: 1024px) {
    border-top: 1px solid black;
    padding: 0;
    padding-bottom: 60px;
    padding-top: 20px;
    .swiper-pagination {
      display: block;
    }
    .swiper-button {
      display: none;
    }
  }
`;
const SwiperSlideWrapper = styled(SwiperSlide)`
  height: 295px;
  @media (min-width: 1024px) {
  }
  @media (max-width: 1024px) {
    min-height: 120px;
    max-height: 200px;
    & > span {
      font-size: 16px;
    }
    & > p {
      font-size: 14px;
    }
  }
`;
const NavBlock = styled("div")`
  z-index: 1200;
  position: absolute;
  top: calc(100% - 295px - 56px);
  left: 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
    & > #items-nav {
      display: flex;
      gap: 20px;

    }
  @media (min-width: 1024px) {
  }
  @media (max-width: 1024px) {
    top: calc(100% - 94px);
    left: 20px;
    gap: 10px;
    & > #items-nav {
      display: flex;
      gap: 10px;
    } 
  }
`;
const CustomPagination = styled("div")`
  color: var(--brand-color-black-blue);

  font-family: "PT Sans";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const ItemsSwiper: FC<ItemsSwiperProps> = ({ items, handleActiveChange, activeIndex, onResize }) => {
  const swiperRef = useRef<SwiperRef | null>(null);

  const handleResize = ({ realIndex, ...swiper }: SwiperClass) => {
    onResize();
  };
  const debounceResize = useDebounce(handleResize, 600);

  const pagination: PaginationOptions = {
    clickable: false,
    type: "fraction",
    el: ".items-pagination",
    formatFractionCurrent: (number: number) => `${number}`.padStart(2, "0"),
    formatFractionTotal: (number: number) => `${number}`.padStart(2, "0"),
  };
  const navigation = {
    nextEl: ".items-swiper-button-next",
    prevEl: ".items-swiper-button-prev",
  };

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;

      if (activeIndex !== swiperInstance.activeIndex)
        swiperInstance.slideTo(activeIndex);
    }
  }, [activeIndex]);

  return (
    <div>
      <NavBlock>
        <CustomPagination className="items-pagination"></CustomPagination>
        <div id="items-nav">
          <NavIcon
            size={40}
            opposite={false}
            className={"items-swiper-button-prev"}
          />
          <NavIcon
            size={40}
            opposite={true}
            className={"items-swiper-button-next"}
          />
        </div>
      </NavBlock>

      <CustomSwiper
        ref={swiperRef}
        spaceBetween={25}
        slidesPerView={1}
        speed={1000}
        allowTouchMove={false}
        onResize={debounceResize}
        pagination={pagination}
        navigation={navigation}
        modules={[Pagination, EffectFade, Navigation]}
        effect="fade"
        autoplay={{
          delay: 1.2,
          stopOnLastSlide: false,
        }}
        rewind={true}
        fadeEffect={{
          crossFade: true,
        }}
        onSlideChange={({ realIndex, ...swiper }: SwiperClass) => {
          handleActiveChange(realIndex);
        }}
      >
        {items.map((item, index) => {
          return (
            <SwiperSlideWrapper key={String(index) + new Date().toDateString()}>
              <EventSwiper activeIndex={activeIndex} events={item.events} />
            </SwiperSlideWrapper>
          );
        })}
      </CustomSwiper>
    </div>
  );
};

export default ItemsSwiper;
