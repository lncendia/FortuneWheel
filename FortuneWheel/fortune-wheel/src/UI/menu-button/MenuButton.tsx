import styled from 'styled-components';
import React from 'react';

const Button = styled.button`
  width: 60px;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: transparent;
  border-radius: 10px;
  cursor: pointer;

  transition: background 0.2s ease,
  transform 0.2s ease;

  svg {
    width: 30px;
    height: 30px;
    stroke: #111111;
    stroke-width: 2;
    transition: stroke 0.2s ease,
    transform 0.2s ease;
  }

  &:hover {
    background: #f3f4f6;
  }

  &:hover svg {
    stroke: #2563eb;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  &:disabled:hover {
    background: transparent;
  }

  &:disabled svg {
    stroke: #111111;
    transform: none;
  }
`;

const MenuButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <Button aria-label="Menu" {...props}>
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 6H20"/>
        <path d="M4 12H20"/>
        <path d="M4 18H20"/>
      </svg>
    </Button>
  );
};

export default MenuButton;
