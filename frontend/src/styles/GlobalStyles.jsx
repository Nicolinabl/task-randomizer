import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box; 
    margin: 0px;
  }

  :root {
    --main-bg-color: #FFF1F9;
    --background-light-purple: #F4F0FF;

    --main-text-color: #000000;
    --main-white: #ffffff;

    --primary-color: #FFF4CA;
    --secondary-color: #DAFFE6;
    --secondary-button-color: #E9628C;

    --accent-color: #F497B4;
    --accent-purple: #B594FF;

    --medium-pink: #FFD2EC;
    --medium-purple: #7954fd;
    --light-yellow: #FFF4CA;
    --light-pink: #FFE2F3;
    --light-purple: #E5DEF8;
    --dark-purple: #2D0FA3;

  }

  #root {
    max-width: 500px;
    width: 100%;
  }

  body {
    margin: 0;
    display: flex;
    justify-content: center;
    background-color: var(--main-bg-color);
    font-family: "Roboto", sans-serif;
  }

  h1 {
    font-family: "Pixelify Sans", sans-serif;
    font-size: 26px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  h2 {
    font-family: "Pixelify Sans", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 10px 0;
  }

  h3 {
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  p {
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-wrap: pretty;
  }


`;
