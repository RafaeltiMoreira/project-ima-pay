import styled from "styled-components";

export const HeaderLoginContainer = styled.header`
  box-shadow: 0 0.1rem 0.5rem ${({ theme }) => theme.colors.ice};
  padding: 1rem 0;
`;

export const HeaderLoginContent = styled.div`
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
    gap: 0.75rem;

    border: 1px solid transparent;
    padding: 1rem;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors["--theme"]};
    font-weight: 500;
    border-radius: 10px;

    &:hover {
      border: 1px solid ${({ theme }) => theme.colors["--theme"]};
      transition: background-color 0.2s border-color 0.2s;
    }
  }

  .btn-out {
    color: ${({ theme }) => theme.colors["ima-900"]};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
