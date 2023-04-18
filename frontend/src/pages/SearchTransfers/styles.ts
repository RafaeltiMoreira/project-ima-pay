import styled from "styled-components";

export const ViewTransfersContainer = styled.form`
  display: flex;
  gap: 1rem;

  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 5rem 1.5rem 0;

  input {
    flex: 1;
    border-radius: 10px;
    border: 1px solid transparent;
    background: ${({ theme }) => theme.colors.ice};
    color: ${(props) => props.theme.colors["--theme"]};
    font-weight: 500;
    padding: 1rem;

    &::placeholder {
      color: ${({ theme }) => theme.colors["--theme"]};
    }

    &:hover {
      border: 1px solid ${(props) => props.theme.colors["--theme"]};
      transition: background-color 0.2s border-color 0.2s;
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    border: 1px solid transparent;
    padding: 1rem;
    background: ${({ theme }) => theme.colors.ice};
    color: ${(props) => props.theme.colors["--theme"]};
    font-weight: 500;
    border-radius: 10px;
    cursor: pointer;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${({ theme }) => theme.colors.white};
      border: 1px solid ${(props) => props.theme.colors["--theme"]};

      transition: background-color 0.2s border-color 0.2s;
    }
  }
`;

export const ButtonReturn = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  padding: 1rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.ice};

  &:hover {
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors["ima-900"]};
  }

  .btn-back {
    color: ${(props) => props.theme.colors["ima-900"]};
  }
`;
