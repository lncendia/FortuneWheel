import styled from "styled-components";
import React from "react";

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
    stroke: #ef4444;
    transform: rotate(90deg) scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CloseButton = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return (
    <Button aria-label="Close" {...props}>
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M6 6L18 18"/>
        <path d="M18 6L6 18"/>
      </svg>
    </Button>
  );
};

export default CloseButton;
