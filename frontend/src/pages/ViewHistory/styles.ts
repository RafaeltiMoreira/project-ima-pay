import styled from "styled-components";

export const ViewFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  .input-view {
    flex: 1;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.transparent};
    background: ${({ theme }) => theme.colors["--background-modal"]};
    color: ${({ theme }) => theme.colors["--theme"]};
    padding: 1rem;

    &::placeholder {
      color: ${({ theme }) => theme.colors["--theme-dark"]};
    }
  }

  .button-view {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.transparent};
    background: ${({ theme }) => theme.colors["--background-modal"]};
    color: ${({ theme }) => theme.colors["--theme"]};
    font-weight: 500;
    border-radius: 10px;

    cursor: pointer;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      transition: background-color 0.2s border-color 0.2s;
    }
  }
`;
