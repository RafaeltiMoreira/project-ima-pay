import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";

export const HeaderProfileContainer = styled.header`
  padding: 1rem;
`;

export const HeaderProfileContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 70rem;
  margin: 0 auto;
  padding: 0 1.5rem;

  img {
    width: 108px;
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    border: 1px solid transparent;
    padding: 0.5rem;
    background: ${({ theme }) => theme.colors["gray-100"]};
    color: ${(props) => props.theme.colors["--theme"]};
    font-weight: 500;
    border-radius: 6px;

    &:hover {
      background: ${({ theme }) => theme.colors.white};
      border: 1px solid ${(props) => props.theme.colors["--theme"]};
      transition: background-color 0.2s border-color 0.2s;
    }
  }
`;

export const HeaderProfileDiv = styled.div`
  display: flex;
  gap: 2rem;

  a {
    color: ${({ theme }) => theme.colors["ima-900"]};
    border-top: 2.5px solid transparent;
    border-bottom: 2.5px solid transparent;

    &:hover {
      border-bottom: 2.5px solid ${({ theme }) => theme.colors["--theme"]};
    }

    &.active {
      color: ${({ theme }) => theme.colors["--theme"]};
    }
  }

  .btn-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;

    &.active {
      background: ${({ theme }) => theme.colors["--theme"]};
    }
  }
`;

export const HeaderButton = styled(Dialog.Trigger)`
  color: ${({ theme }) => theme.colors["ima-900"]};
  border-top: 2.5px solid transparent;
  border-bottom: 2.5px solid transparent;

  &:hover {
    border-bottom: 2.5px solid ${({ theme }) => theme.colors["--theme"]};
  }

  svg {
    cursor: pointer;

    &.active {
      background: ${({ theme }) => theme.colors["--theme"]};
    }
  }
`;

export const HeaderButtonT = styled(Dialog.Trigger)`
  color: ${({ theme }) => theme.colors["ima-900"]};
  border-top: 2.5px solid transparent;
  border-bottom: 2.5px solid transparent;

  &:hover {
    border-bottom: 2.5px solid ${({ theme }) => theme.colors["--theme"]};
  }

  svg {
    cursor: pointer;

    &.active {
      background: ${({ theme }) => theme.colors["--theme"]};
    }
  }
`;

export const NewTransactionButton = styled.button`
  height: 50px;
  border: 0;
  background: ${({ theme }) => theme.colors["green-500"]};
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors["green-700"]};
    transition: background-color 0.2s;
  }
`;
