import styled from "styled-components";

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Item = styled.div<{ $color: string; $dimmed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px 24px;
  border-radius: 16px;

  background: ${({$color}) => $color};
  opacity: ${({$dimmed}) => ($dimmed ? 0.4 : 1)};

  transition: opacity 0.2s ease,
  transform 0.1s ease;

  &:active {
    transform: scale(0.98);
  }
`;

export const Name = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: end;
  gap: 16px;
`
