import styled, { css } from "styled-components";

export const AllTransfersContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 2rem 1.5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`;

interface TransfersCardsProps {
  variant?: "green";
}

export const AllTransfersCards = styled.div<TransfersCardsProps>`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  padding: 1.2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme.colors["roxo-ima-900"]};
  }

  .legend-amount {
    display: flex;
    font-weight: bold;
    color: ${({ theme }) => theme.colors["roxo-ima-900"]};
  }

  span {
    color: ${({ theme }) => theme.colors["roxo-ima-900"]};
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors["roxo-ima-900"]};
  }

  .text-exit {
    color: ${({ theme }) => theme.colors["ima-900"]};
  }

  a {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 0.75rem;
  }

  ${(props) =>
    props.variant === "green" &&
    css`
      background: ${props.theme.colors["green-300"]};
    `}
`;
