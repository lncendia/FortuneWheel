import styled, {keyframes} from "styled-components";
import type {ReactNode} from "react";

const appear = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const Root = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 0 12px 0 12px;
  box-sizing: border-box;
  color: black;
  animation: ${appear} 180ms ease-out forwards;
`;

const Container = ({children}: { children: ReactNode }) => {
  return (
    <Root>
      {children}
    </Root>
  );
};

export default Container;
