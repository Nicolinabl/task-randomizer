import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    background-color: var(--main-bg-color); 
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
  }
`

