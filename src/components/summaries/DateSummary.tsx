import React, { FC } from "react";
import styled from "styled-components";
import { DateSummaryProps } from "../../types";

const Container = styled.div`
  flex-grow: 1;
  pointer-events: none;
  z-index: -10;
  position: absolute;
  transform-origin: center center;
  top: calc(530px / 2);
  transform: translate(0, -50%);
  width: 100%;
  display: flex;
  gap: 60px;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    position: relative;
    transform: none;
    top: 0;
    gap: 32px;
    padding: 0;
  }
  @media (max-width: 321px) {
    gap: 16px;
  }
`;
const DateSummaryYearSpan = styled.span<{
  $secondary?: boolean;
}>`
  color: ${(props) =>
    props.$secondary
      ? "var(--brand-color-fuchsia)"
      : "var(--brand-color-iris)"};
  text-align: center;
  font-family: var(--brand-font-primary);
  font-size: 200px;
  font-style: normal;
  font-weight: 700;
  line-height: 80%;
  letter-spacing: 4px;
  @media (max-width: 1200px) {
    font-size: 180px;
  }
  @media (max-width: 1024px) {
    font-size: 100px;
    letter-spacing: 2px;
  }
  @media (max-width: 768px) {
    font-size: 64px;
    letter-spacing: -1.12px;
  }
  @media (max-width: 321px) {
    font-size: 56px;
    letter-spacing: -1.12px;
  }
`;
const DateSummary: FC<DateSummaryProps> = ({ events }) => {
  return (
    <Container>
      <DateSummaryYearSpan id="counter-min" as="span" $secondary={false}>
        {Math.min(...events.map((e) => +e.year))}
      </DateSummaryYearSpan>
      <DateSummaryYearSpan id="counter-max" as="span" $secondary={true}>
        {Math.max(...events.map((e) => +e.year))}
      </DateSummaryYearSpan>
    </Container>
  );
};

export default DateSummary;
