import styled from "styled-components";

export const TableContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 1rem auto 0;
  padding: 1rem 1.5rem;
`;

export const TableContent = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    font-weight: 500;
    padding: 1.25rem 2rem;
    background: ${({ theme }) => theme.colors.ice};

    &:first-child {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    &:last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
`;

interface ValueTransfersProps {
  variant: "input" | "output";
}

export const ValueTransfers = styled.span<ValueTransfersProps>`
  white-space: nowrap;
  color: ${(props) =>
    props.variant === "input"
      ? props.theme.colors["green-300"]
      : props.theme.colors["red-300"]};
`;
