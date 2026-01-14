import styled, {css, keyframes} from 'styled-components';
import type {StyledSpinnerProps} from './types';

const selectedAnimation = keyframes`
  25% {
    transform: scale(1.25);
    text-shadow: 1vmin 1vmin 0 hsla(0, 0%, 0%, 0.1);
  }
  40% {
    transform: scale(0.92);
    text-shadow: 0 0 0 hsla(0, 0%, 0%, 0.2);
  }
  60% {
    transform: scale(1.02);
    text-shadow: 0.5vmin 0.5vmin 0 hsla(0, 0%, 0%, 0.1);
  }
  75% {
    transform: scale(0.98);
  }
  85% {
    transform: scale(1);
  }
`;

export const WheelContainer = styled.div`
  --size: clamp(250px, 70vmin, 600px);
  --lg-hs: 0 3%;
  --lg-stop: 50%;
  --lg: linear-gradient(
    hsl(var(--lg-hs) 0%) 0 var(--lg-stop),
    hsl(var(--lg-hs) 20%) var(--lg-stop) 100%
  );

  position: relative;
  display: grid;
  align-items: center;
  font-size: calc(var(--size) / 21);

  * {
    grid-area: spinner;
    box-sizing: border-box;
  }
`;

const createConicGradient = (prizes: Array<{ color: string }>): string => {
  return `conic-gradient(
    from -90deg,
    ${prizes
    .map(({color}, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
    .reverse()}
  )`;
};

export const SpinnerContainer = styled.ul<StyledSpinnerProps>`
  position: relative;
  display: grid;
  align-items: center;
  grid-template-areas: "spinner";
  width: var(--size);
  height: var(--size);
  transform: rotate(calc(${props => props.$rotate} * 1deg));
  border-radius: 50%;
  padding: 0;
  background: ${props => createConicGradient(props.$prizes)};
  transition: ${props => props.$isSpinning ? 'transform 2.5s cubic-bezier(0.1, -0.01, 0, 1)' : 'none'};
`;

export const PrizeItem = styled.li<{ $rotate: number }>`
  display: flex;
  align-items: center;
  padding: 0 calc(var(--size) / 6) 0 calc(var(--size) / 20);
  width: 50%;
  height: 50%;
  transform-origin: center right;
  transform: rotate(${props => props.$rotate}deg);
  user-select: none;
  list-style: none;
`;

export const PrizeText = styled.span<{ $selected: boolean }>`
  color: ${({$selected}) => ($selected ? 'white' : 'inherit')};
  ${({$selected}) =>
    $selected &&
    css`
      animation: ${selectedAnimation} 800ms ease;
    `}
`;

const tickerAnimation = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  40% {
    transform: rotate(-12deg);
  }
`;

export const Ticker = styled.div<{ $isSpinning: boolean }>`
  position: relative;
  left: calc(var(--size) / -15);
  width: calc(var(--size) / 10);
  height: calc(var(--size) / 20);
  background: var(--lg);
  z-index: 1;
  clip-path: polygon(20% 0, 100% 50%, 20% 100%, 0% 50%);
  transform-origin: center left;
  animation: ${tickerAnimation} 700ms cubic-bezier(0.34, 1.56, 0.64, 1);
`;
