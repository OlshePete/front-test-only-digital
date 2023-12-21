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
export interface SvgProps {
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
  events: Event[];
}
export interface TimelineProps {
  items: Item[];
  activeIndex: number;
}
export interface EventSwiperProps {
  events: Event[];
  activeIndex: number;
}