import styled, {css, keyframes} from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Button = styled.button<{
  $active?: boolean;
  $danger?: boolean;
  $loading?: boolean;
}>`
  min-width: 120px;
  min-height: 48px;
  padding: 0 20px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  border-radius: 16px;
  border: none;

  cursor: pointer;
  position: relative;

  background: ${({$active, $danger}) => {
    if ($danger) return '#dc2828';
    if ($active) return '#ffffff';
    return '#1f2430';
  }};

  color: ${({$active}) => ($active ? '#000000' : '#ffffff')};

  transition: background 0.2s ease,
  color 0.2s ease,
  transform 0.1s ease,
  opacity 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({$active, $danger}) => {
      if ($danger) return '#b12727';
      if ($active) return '#f0f0f0';
      return '#2b3242';
    }};
  }

  &:active:not(:disabled) {
    transform: scale(0.96);
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }

  ${({$loading, $active}) =>
    $loading &&
    css`
      color: transparent;
      pointer-events: none;

      &::after {
        content: '';
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: ${$active ? '2px solid rgba(64, 64, 64, 0.9)' : '2px solid rgba(255, 255, 255, 0.9)'};
        border-top-color: currentColor;
        animation: ${spin} 0.7s linear infinite;
        position: absolute;
      }
    `}
`;
