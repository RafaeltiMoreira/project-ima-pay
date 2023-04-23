import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: ${({ theme }) => theme.colors["modal-rgba"]};
`;

export const ContentPix = styled(Dialog.Content)`
  max-width: 42rem;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      border-radius: 6px;
      border: 1px solid ${({ theme }) => theme.colors.transparent};
      background: ${({ theme }) => theme.colors["gray-100"]};
      color: ${(props) => props.theme.colors["--theme"]};
      padding: 1rem;

      &::placeholder {
        color: ${(props) => props.theme.colors["--theme"]};
      }
    }

    button[type="submit"] {
      height: 58px;
      border: 0;
      background: ${(props) => props.theme.colors["--btn-hover"]};
      color: ${(props) => props.theme.colors.white};
      border-radius: 6px;
      margin-top: 1rem;
      cursor: pointer;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: ${(props) => props.theme.colors["ima-900"]};
        transition: background-color 0.2s;
      }
    }
  }
`;

export const TransfersValuePix = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

interface TransfersValueButtonPropsPix {
  variant: "input" | "output";
}

export const TransfersValueButtonPix = styled(
  RadioGroup.Item
)<TransfersValueButtonPropsPix>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  color: ${(props) => props.theme.colors["--theme"]};
  background: ${(props) => props.theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.transparent};

  gap: 0.5rem;
  border-radius: 6px;
  cursor: pointer;

  svg {
    color: ${(props) =>
      props.variant === "input"
        ? props.theme.colors["green-300"]
        : props.theme.colors["ima-900"]};
  }

  &[data-state="checked"] {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) =>
      props.variant === "input"
        ? props.theme.colors["green-300"]
        : props.theme.colors["ima-900"]};

    svg {
      color: ${(props) => props.theme.colors.white};
    }
  }
`;

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  font-weight: 500;
  color: ${({ theme }) => theme.colors["--theme"]};

  &:hover {
    font-weight: 400;
    transition: background-color 0.2s;
  }
`;
