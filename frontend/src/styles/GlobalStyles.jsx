import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  :root {
    --main-bg-color: #FFFFFF;
    --main-text-color: #000000;
    --primary-color: #D9D9D9;
    --secondary-color: #ECECEC;
    --accent-color: #F7F7F7;
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

