import React, {
  FC,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { DateSummaryProps, YearSpanProp } from "../../types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Container = styled.div`
  flex-grow: 1;
  pointer-events: none;
  z-index: -10;
  position: absolute;
  transform-origin: center center;
  top: calc(530px / 2 + 40px);
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

function YearSpan({ timeline, year, secondary = false }: YearSpanProp) {
  const el = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(year);

  useGSAP(() => {
    console.log("active year", secondary, "c^", value, " по ", year);

    timeline &&
      timeline.fromTo(
        el.current,
        {
          textContent: value,
          snap: { textContent: 1 },
          stagger: 10,
        },
        {
          textContent: year,
          snap: { textContent: 1 },
          stagger: 1,
          onCompleteParams: [setValue],
          onComplete: (setValue) => setValue(year),
        },
        0
      );
  }, [timeline, year]);

  return (
    <DateSummaryYearSpan $secondary={secondary} className="circle" ref={el}/>
  );
}

const DateSummary: FC<DateSummaryProps> = ({ dataset, activeIndex }) => {
  const [yearList, setYearList] = useState<number[]>(
    dataset[activeIndex].events.map((e) => +e.year)
  );

  const timeline = useRef<gsap.core.Timeline>(
    gsap.timeline({ defaults: { duration: 2 } })
  );

  useGSAP(() => {timeline.current = gsap.timeline({ defaults: { duration: 2 } })},{dependencies: [activeIndex]});
 
  useEffect(() => {
    setYearList(dataset[activeIndex].events.map((e) => +e.year));
  }, [dataset, activeIndex]);

  return (
    <Container>
      <YearSpan timeline={timeline.current} year={Math.min(...yearList)} />
      <YearSpan
        timeline={timeline.current}
        year={Math.max(...yearList)}
        secondary={true}
      />
    </Container>
  );
};

export default DateSummary;
