import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root {
  --brand-color-background:#F4F5F9;
  --brand-color-black-blue:#42567A;
  --brand-color-blue:#3877EE;
  --brand-color-white:#FFFFFF;
  --brand-color-fuchsia:#EF5DA8;
  --brand-color-iris:#5D5FEF;
  --brand-color-border-active-circle-item:#303E58;

  --brand-color-icon-shadow:rgba(56, 119, 238, 0.10);

  --brand-font-primary:"PT Sans", sans-serif;
  --brand-font-secondary:'Bebas Neue', sans-serif;


  --swiper-navigation-sides-offset:0px;
  --swiper-navigation-top-offset: 50%;

  --swiper-pagination-bullet-size: 6px;
  --swiper-pagination-color: var(--brand-color-black-blue);
  --swiper-pagination-top: calc(100% - 60px)
} 
body {
    margin: 0;
    padding: 0;
    font-family: var(--brand-font-primary);
    background-color:var(--brand-color-background);
    min-height:100vh;
  }
#items-next-btn,#events-next-btn {
  &>path {
    transform:rotate(180deg)
  }
}
`;