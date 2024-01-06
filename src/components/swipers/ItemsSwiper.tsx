import React, { FC, useEffect, useRef } from "react";
import styled from "styled-components";

import { Navigation, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";
import { PaginationOptions } from "swiper/types/modules/pagination";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ItemsSwiperProps } from "../../types";
import NavIcon from "../icons/NavIcon";
import { useDebounce } from "../../hooks/useDebounce";
import EventSwiper from "./EventSwiper";

const Container = styled('div')`
  @media (max-width: 1024px) {
    flex-grow:0;
  }
  @media (max-width: 768px) {
    /* flex-grow:0.2; */
  }
`

const CustomSwiper = styled(Swiper)`
  overflow: visible;
  width: 100%;
  height:100%;
  @media (min-width: 1024px) {
    .swiper-pagination {
      display: none;
    }
  }
  @media (max-width: 1024px) {
    border-top: 1px solid black;
    padding: 0;
    padding-bottom: 0px;
    .swiper-pagination {
      display: block;
    }
    .swiper-button {
      display: none;
    }
  }
  @media (max-width: 768px) {
    padding-bottom: 0px;
    
  }
`;
const SwiperSlideWrapper = styled(SwiperSlide)`
  height: 295px;
  @media (min-width: 1024px) {
  }
  @media (max-width: 1024px) {
    height: 200px;
    padding: 0;

    & > span {
      font-size: 16px;
    }
    & > p {
      font-size: 14px;
    }
  }
  @media (max-width: 768px) {
    z-index:10000;
    height: 100%;
    padding-bottom:0px;
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
  top: calc(530px);
  left: 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  & > #items-nav {
    display: flex;
    gap: 20px;
  }
  @media (max-height: 790px) {
    top:calc(530px - 60px); 
  }
  @media (max-width: 1440px) and (min-width: 768px) and (max-height: 790px) {
    top:calc(530px - 100px); 
  }
  @media (max-width: 1024px) {
    top: calc(100% - 64px);
  }
  @media (max-width: 1024px) {
    top: calc(100% - 64px);
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
const ItemsSwiper: FC<ItemsSwiperProps> = (props) => {
  const { items, handleActiveChange, activeIndex, onResize } = props;
  const swiperRef = useRef<SwiperRef | null>(null);
console.table(props)
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
    <Container id='items-swiper'>
      <NavBlock>
        <CustomPagination className="items-pagination"></CustomPagination>
        <div id="items-nav">
          <NavIcon
            size={40}
            opposite={false}
            id="items"
            className={"items-swiper-button-prev"}
          />
          <NavIcon
            size={40}
            opposite={true}
            id="items"
            className={"items-swiper-button-next"}
          />
        </div>
      </NavBlock>

      <CustomSwiper
      
        ref={swiperRef}
        spaceBetween={0}
        slidesPerView={1}
        speed={2000}
        allowTouchMove={false}
        onResize={debounceResize}
        pagination={pagination}
        navigation={navigation}
        modules={[Pagination, Navigation,
          EffectFade 
        ]}
        effect="fade"
        virtualTranslate={ true}
        slidePrevClass="items-swapper-wrapper"
        // setWrapperSize={true}
        // autoplay={{
        //   delay: 1.2,
        //   stopOnLastSlide: false,
        // }}
        rewind={true}
        fadeEffect={{
          crossFade: true,

        }}
        onSlideChange={({ realIndex, ...swiper }: SwiperClass) => {
          if (realIndex !== activeIndex) handleActiveChange(realIndex);
        }}
      >
        {items.map((item, index) => {
          return (
            <SwiperSlideWrapper key={String(index) + new Date().toDateString()}>
              {/* <h1>slide {index}</h1> */}
              <EventSwiper activeIndex={activeIndex} events={item.events} onResize={()=>console.log('resize')} />
            </SwiperSlideWrapper>
          );
        })}
      </CustomSwiper>
    </Container>
  );
};

export default ItemsSwiper;
