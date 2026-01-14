import styled from 'styled-components';

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  padding-bottom: 5px;
  gap: 12px;
`;

export const Input = styled.input`
  height: 80px;
  padding: 0 20px;

  border-radius: 16px;
  border: none;

  background: #cdcdcd;
  color: #46464c;

  outline: none;

  transition: background 0.2s ease,
  box-shadow 0.2s ease;

  &::placeholder {
    color: #5d5d65;
  }

  &:focus {
    background: #eaeaea;
    box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.4);
  }

  &:disabled {
    opacity: 0.6;
  }
`;

export const ErrorText = styled.div`
  grid-column: 1 / -1;
  margin-top: 4px;

  font-size: 14px;
  color: #f87171;
`;
