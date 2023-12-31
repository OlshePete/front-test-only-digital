import { FC, Ref } from "react";
import gsap from "gsap"

export interface IContext {
  active: number;
  getActive?: () => number;
  moveTo?: (id: number) => void;
}
export interface Event {
  year: number;
  content: string;
}
export interface Item {
  width: number;
  angle: number | null;
  posX: number | null;
  posY: number | null;
  label: string;
  events: Event[];
}
export interface CircularListProps {
  dataset: Item[]
}
export interface CircularItemProps {
  index: number;
  handleItemClick: (id: number,) => void;
  active: boolean;
}
export interface ActiveIndex {
  index: number;
  prev: number | null;
  angle: number | null;
}

export interface NavIconProps {
  size?: number;
  circleColor?: string;
  pathColor?: string;
  opposite?: boolean;
  onClick?: () => void;
  className?: string;
  fill?: string;
}
export interface FCwithRefProps {
  ref: Ref<HTMLDivElement>
}
export interface SvgProps extends FCwithRefProps {
  size?: number;
  $circleColor?: string;
  $pathColor?: string;
  $opposite?: boolean;
  onClick?: () => void;
  className?: string;
  fill?: string;
}
export interface ItemsNavigationProps {
  itemsLength: number;
  activeIndex: number;
  handleSetActive: (index: number) => void;
}

export interface ItemsSwiperProps {
  items: Item[];
  onResize: () => void;
  handleActiveChange: (index: number) => void;
  activeIndex: number;
}
export interface DateSummaryProps {
  dataset: Item[];
  activeIndex: number;
}
export interface TimelineProps {
  items: Item[];
  activeIndex: number;
}
export interface EventSwiperProps {
  events: Event[];
  activeIndex: number;
}
export type YearSpanProp = {
  timeline: gsap.core.Timeline | null | undefined;
  year: number;
  secondary?: boolean;
};
export interface CircleSliderProps {
  items: Item[];
  activeIndex: number;
  prevIndex: number;
  timeline: gsap.core.Timeline | null | undefined;
  handleItemClick: (index: number) => void
}
