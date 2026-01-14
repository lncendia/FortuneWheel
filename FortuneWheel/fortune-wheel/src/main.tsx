import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import WheelPage from "./pages/WheelPage.tsx";
import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', 'Segoe UI', Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 22px;
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: 1px;
  }

  button {
    font-family: 'Inter', 'Segoe UI', Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 18px;
  }

  input {
    font-family: 'Inter', 'Segoe UI', Roboto, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 22px;
  }
`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle/>
    <WheelPage/>
  </StrictMode>
)
