import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box; 
  }

  :root {
    --main-bg-color: #FFF1F9;
    --main-text-color: #000000;
    --primary-color: #FFF4CA;
    --secondary-color: #DAFFE6;
    --accent-color: #F497B4;
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
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

`

