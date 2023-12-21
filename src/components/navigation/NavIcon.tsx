import React from "react";
import styled from "styled-components";
import Icon from "./Icon";
import { NavIconProps, SvgProps } from "../../types";


const Svg = styled(Icon)<SvgProps>`
  width: ${(props) => props.size ?? 50}px;
  height: ${(props) => props.size ?? 50}px;
  cursor: pointer;
  filter:drop-shadow(0px 0px 15px var(--brand-color-icon-shadow));
  &:hover{
    fill:var(--brand-color-white);
  }
  circle {
    stroke: ${(props) => props.$circleColor ?? "var(--brand-color-black-blue)"};
    transition: transform 0.3s ease-in-out;
  }

  path {
    transform: ${(props) => (props.$opposite ? "rotate(180deg)" : "none")};
    stroke: ${(props) => props.$pathColor ?? "var(--brand-color-black-blue)"};
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
  }
`;

const NavIcon: React.FC<NavIconProps> = ({
  size = 50,
  circleColor = "var(--brand-color-black-blue)",
  pathColor = "var(--brand-color-black-blue)",
  opposite = true,
  fill="none",
  onClick,
  className,
}) => {
  return (
    <Svg
      viewBox="0 0 50 50"
      width="50"
      height="50"
      $pathColor={pathColor}
      fill={fill}
      $circleColor={circleColor}
      $opposite={opposite}
      onClick={onClick}
      size={size}
      className={className ?? ""}
    >
      <circle
        cx="25"
        cy="25"
        r="24.5"
        transform="matrix(-1 0 0 1 50 0)"
        stroke={pathColor}
        strokeOpacity="0.5"
      />
      <path
        d="M27.4999 18.75L21.2499 25L27.4999 31.25"
        stroke="var(--brand-color-black-blue)"
        strokeWidth="2"
      />
    </Svg>
  );
};

export default NavIcon;
